---
icon: lucide/arrow-left-right
---

# Buying and selling

Every coin trades in its own Uniswap v4 pool against USDG. Gmoon has no router of its own: you trade through any Uniswap v4 router. The pool's Hook charges the trading fee inside the swap.

## The pool

A coin's pool key is:

| Field | Value |
|-------|-------|
| `currency0`, `currency1` | The coin and USDG, sorted by address |
| `fee` | `0`. The Hook charges the trading fee, not the pool |
| `tickSpacing` | `200` |
| `hooks` | `Controller.hookOf(coin)` |

```ts
const [currency0, currency1] =
  USDG.toLowerCase() < coin.toLowerCase() ? [USDG, coin] : [coin, USDG];
const hook = await publicClient.readContract({
  address: CONTROLLER, abi: controllerAbi, functionName: "hookOf", args: [coin],
});
const poolKey = { currency0, currency1, fee: 0, tickSpacing: 200, hooks: hook };
```

`hookOf` returns zero for a coin launched by an older Controller. Then use the Controller's `hook()`.

## The fee

The fee is always charged in USDG, on top of the swap as the pool prices it:

- on a **buy**, you pay `pairAmount + fee` USDG;
- on a **sell**, you receive `pairAmount - fee` USDG.

For the first 10 seconds after launch the fee falls from 80% to the coin's fee, then stays at the coin's fee (1% to 5%). See [Trading fees](../concepts/trading-fees.md) and [Anti-sniper fee](../concepts/trading-fees.md#anti-sniper-fee). A quote from the Uniswap v4 Quoter already includes the fee.

To read the fee of a coin:

| Function (Hook) | Returns |
|-----------------|---------|
| `currentFeeBips(coin)` | Fee of a swap right now, in bips |
| `feeBipsAt(coin, timestamp)` | Fee at any timestamp, in bips |
| `baseFeeBips(coin)` | The coin's fee after the first 10 seconds |
| `memeFeeBips(coin)` | The fee its creator chose |

## Who is the trader

The Hook sees the router as the swap sender. To attribute a swap to the user, pass their address in `hookData` as one ABI-encoded `address` (32 bytes). It appears as `trader` in the `MemeSwapped` event. It is self-reported and meant for display, so don't use it for access control. Empty `hookData` is valid: `trader` is then zero.

## Buy with USDG

Swap with `SWAP_EXACT_IN_SINGLE` of the Universal Router, paying USDG and receiving the coin. USDG moves through Permit2.

```ts
import { encodeAbiParameters } from "viem";
import { CommandType, RoutePlanner } from "@uniswap/universal-router-sdk";
import { V4Planner, Actions } from "@uniswap/v4-sdk";

// 1. One-time per token: ERC-20 -> Permit2
await walletClient.writeContract({
  address: USDG, abi: erc20Abi, functionName: "approve", args: [PERMIT2, amountIn],
});
// 2. Permit2 -> Universal Router
await walletClient.writeContract({
  address: PERMIT2, abi: permit2Abi, functionName: "approve",
  args: [USDG, UNIVERSAL_ROUTER, amountIn, expiration], // expiration: uint48 timestamp
});

// 3. Quote
const zeroForOne = USDG.toLowerCase() === poolKey.currency0.toLowerCase();
const hookData = encodeAbiParameters([{ type: "address" }], [account]);
const [amountOut] = await publicClient.readContract({
  address: V4_QUOTER, abi: quoterAbi, functionName: "quoteExactInputSingle",
  args: [{ poolKey, zeroForOne, exactAmount: amountIn, hookData }],
});
const minOut = (amountOut * 99n) / 100n; // 1% slippage

// 4. Swap
const v4 = new V4Planner();
v4.addAction(Actions.SWAP_EXACT_IN_SINGLE, [{
  poolKey, zeroForOne,
  amountIn: amountIn.toString(),
  amountOutMinimum: minOut.toString(),
  minHopPriceX36: "0",
  hookData,
}]);
v4.addAction(Actions.SETTLE_ALL, [USDG, amountIn.toString()]);
v4.addAction(Actions.TAKE_ALL, [coin, minOut.toString()]);

const route = new RoutePlanner();
route.addCommand(CommandType.V4_SWAP, [v4.actions, v4.params]);

await walletClient.writeContract({
  address: UNIVERSAL_ROUTER, abi: routerAbi, functionName: "execute",
  args: [route.commands, [v4.finalize()], deadline],
});
```

!!! note "Universal Router 2.1.x"
    The swap struct carries `minHopPriceX36`. Use the 2.1 version of the Uniswap SDKs, or the encoding reverts.

## Sell

The same swap in the other direction. The coin is the input: approve it to Permit2, then Permit2 to the router, set `zeroForOne` to `coin === currency0`, `SETTLE_ALL` on the coin and `TAKE_ALL` on USDG.

## Buy with ETH

Pools are against USDG, so ETH has to become USDG first. The app does it in two steps: ETH to USDG through the Uniswap v3 WETH/USDG pool (Universal Router commands `WRAP_ETH`, `V3_SWAP_EXACT_IN`, `UNWRAP_WETH`), then USDG to the coin with the swap above. The v3 fee tiers are 0.01%, 0.05%, 0.3% and 1%. Quote them with the v3 QuoterV2 and pick the best one.

## Slippage and the quote

- Always compute `amountOutMinimum` from a fresh quote of the Quoter. The pool price moves with every trade.
- Reading the Quoter through a wallet's RPC: treat an answer above `uint128` as no quote. Some wallets return revert data as a successful call result.
- A swap that triggers a [vault conversion](earn-vault.md#conversion) needs extra gas. If the gas limit is too low, the Hook reverts with `NotEnoughGasForConversion(needed, available)`. Estimate the gas with `eth_estimateGas` right before sending instead of hardcoding it.

## Events

| Event | Contract | Meaning |
|-------|----------|---------|
| `MemeSwapped(meme, router, trader, isBuy, pairAmount, memeAmount, fee)` | Hook | One swap in a coin pool. The best source for trades and volume. |
| `FeeCharged(poolId, sender, amount)` | Hook | The fee taken from one swap |
| `FeesDistributed(meme, vault, amount)` | Hook | Accrued fees paid to the Earn Vault |
| `PayoutFailed(reason)` | Hook | An automatic payout failed. The swap succeeded and the fee stays accrued. |

## Pay out stuck fees

The Hook pays out the accrued fees of a coin at the end of every swap. If a payout failed, anyone can pay out the accrued fees:

```solidity
function distribute(address coin) external;   // Hook
function pendingFees(address coin) external view returns (uint256); // Hook, USDG accrued
```
