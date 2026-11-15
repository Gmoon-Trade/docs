---
icon: lucide/rocket
---

# Launching a coin

A coin is launched with one call, `Controller.deployToken`. In that transaction the Controller deploys the coin, registers its Earn Vault, creates the Uniswap v4 pool against USDG, puts the whole supply into the starting liquidity and, if asked, buys part of the supply for the caller.

## What a launch fixes

| Parameter | Value |
|-----------|-------|
| Supply | 1,000,000,000 coins, 18 decimals, all in the pool |
| Pair token | USDG |
| Start price | 50,000 coins per 1 USDG, a market cap of about $20,000 |
| Pool LP fee | 0. The trading fee is charged by the Hook |
| Tick spacing | 200 |
| Trading fee | 1% to 5% (`swapFeeBips` 100 to 500), chosen at launch, can't be changed |
| Creator share | 0% to 50% of the vault part of the fee (`vaultCreatorShareBps` 0 to 5000), can't be changed |
| Reward assets | 1 to 8 assets from the Vault allowlist, weights add up to 10000 bps, can't be changed |
| Creator buy | Optional, up to 80% of the supply, paid in USDG |

## Function

```solidity
function deployToken(DeployConfig memory config) external payable returns (address coin);
```

```solidity
struct DeployConfig {
    TokenConfig tokenConfig;        // metadata and admins
    RewardsConfig rewardsConfig;    // fee and creator
    AssetConfig[] vaultAssets;      // reward assets and weights
    uint16 vaultCreatorShareBps;    // 0..5000
    DevBuyConfig devBuy;            // optional first buy
}

struct TokenConfig {
    string imgUrl;                  // required
    string description;
    SocialMedia socialMedia;        // farcaster, twitter, telegram, website
    string name;                    // required, up to 150 characters
    string symbol;                  // required, up to 50 characters
    AdminConfig[] admins;           // at least one: { address admin, bool removable }
}

struct RewardsConfig {
    uint256 swapFeeBips;            // 100..500
    address creatorAddress;         // must not be zero
    address rewardRecipient;        // receives the creator share, zero means creatorAddress
}

struct AssetConfig {
    address token;                  // must be on the Vault allowlist
    uint16 weightBps;               // weights sum to 10000
}

struct DevBuyConfig {
    uint256 memeAmount;             // exact coins to buy, 0 means no buy
    uint256 maxPairIn;              // most USDG you accept to pay, fee included
}
```

The caller and the Controller are added to the coin's admins automatically. Admins can change the coin's image and description.

## The creator buy

With `devBuy.memeAmount` above zero, the caller becomes the first buyer of the pool in the same transaction, so nobody can buy before them.

- The buy pays the coin's own trading fee, not the [anti-sniper fee](../concepts/anti-sniper-fee.md).
- It is paid in USDG. Approve the Controller for `maxPairIn` USDG first.
- `memeAmount` is limited to 80% of the supply (`MAX_DEV_BUY_BIPS` = 8000). Above it, the call reverts with `DevBuyTooLarge`.
- If the price of `memeAmount` plus fee exceeds `maxPairIn`, the call reverts with `DevBuySlippage`.

## Example

```ts
import { parseUnits, maxUint256 } from "viem";

const usdgIn = parseUnits("50", 6); // most USDG to pay for the creator buy

// 1. Approve the Controller for the creator buy (skip it if devBuy.memeAmount is 0)
await walletClient.writeContract({
  address: USDG, abi: erc20Abi, functionName: "approve",
  args: [CONTROLLER, usdgIn],
});

// 2. Launch
const hash = await walletClient.writeContract({
  address: CONTROLLER,
  abi: controllerAbi,
  functionName: "deployToken",
  args: [{
    tokenConfig: {
      imgUrl: "https://example.com/coin.png",
      description: "My coin",
      socialMedia: { farcaster: "", twitter: "", telegram: "", website: "" },
      name: "My Coin",
      symbol: "MYC",
      admins: [{ admin: creator, removable: true }],
    },
    rewardsConfig: {
      swapFeeBips: 200n,                 // 2%
      creatorAddress: creator,
      rewardRecipient: creator,
    },
    vaultAssets: [
      { token: NVDA, weightBps: 5000 },
      { token: TSLA, weightBps: 3000 },
      { token: SPY,  weightBps: 2000 },
    ],
    vaultCreatorShareBps: 2000,          // 20% of the vault part
    devBuy: { memeAmount: parseUnits("10000000", 18), maxPairIn: usdgIn },
  }],
});
```

To get the address of the new coin, read `TokenCreated` from the receipt, or simulate the call and use its return value.

```ts
const receipt = await publicClient.waitForTransactionReceipt({ hash });
const [log] = parseEventLogs({ abi: controllerAbi, eventName: "TokenCreated", logs: receipt.logs });
const coin = log.args.tokenAddress;
```

## Events

| Event | Emitted when |
|-------|--------------|
| `TokenCreated(tokenAddress, creatorAdmin, positionId, creatorRewardRecipient, name, symbol)` | The coin is launched. The address of every new coin is here. |
| `PoolCreated(pool, token0, token1, initialPrice, tick)` | The pool is initialized. |
| `PositionCreated(token, positionId, tickLower, tickUpper, liquidity)` | The starting liquidity is minted. |
| `DevBuy(token, buyer, pairIn, memeOut)` | The creator buy is made. |

## Reverts

| Error | Cause |
|-------|-------|
| `DevBuyTooLarge(memeAmount, max)` | Creator buy above 80% of the supply |
| `DevBuySlippage(pairIn, maxPairIn)` | The creator buy costs more than `maxPairIn` |
| `AssetNotAllowed(asset)` | A reward asset is not on the allowlist |
| `DuplicateAsset(asset)` | The same reward asset twice |
| `InvalidAssetsLength` | Fewer than 1 or more than 8 reward assets |
| `InvalidWeights` | Weights don't add up to 10000 |
| `InvalidCreatorShare(bps)` | Creator share above 5000 |
| `InvalidMemeFeeBips(bips)` | Trading fee outside 1% to 5% |

## Admin helpers

```solidity
function changeAdmin(address coin, address oldAdmin, address newAdmin) external;
function hookOf(address coin) external view returns (address);
```

`changeAdmin` replaces an admin that was added as `removable`. Only an admin of the coin can call it.

## Coin contract

Every coin implements ERC-20, ERC-165 and ERC-1046 (`tokenURI()` with on-chain metadata).

| Function | Returns |
|----------|---------|
| `creator()` | The account that launched the coin |
| `imageAddress()`, `description()`, `getSocialMedia()` | Metadata |
| `showAdmins()` | Admin addresses |
| `totalHolders()` | Addresses with a non-zero balance |
| `feeInfo()` | The fee split fixed at launch, in parts per million: `totalPpm`, `creatorPpm`, `vaultPpm`, `protocolPpm` |
| `updateImage(string)`, `changeDescription(string)`, `setTokenURI(string)` | Admin only |
