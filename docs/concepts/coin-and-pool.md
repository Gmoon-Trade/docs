---
icon: lucide/droplets
---

# Coin and pool

A launch is one transaction. It creates the coin, opens a Uniswap v4 pool with USDG and puts the whole supply into the pool. The coin can be traded from the same block, with no bonding curve and no graduation. The launch also creates the coin's Earn Vault. See [Vault and rewards](vault-and-rewards.md).

## The coin

Each coin is a separate ERC-20 contract with support for ERC-165 and ERC-1046 (on-chain metadata).

- The contract has no mint function. The supply is fixed at 1B.
- The contract has no blacklist, no pause and no limit on wallet balances.
- The contract has no owner and no proxy, so its logic can't be changed.
- After launch the creator can change only the image and metadata.

| Property | Value | Fixed |
|----------|-------|-------|
| Supply | 1B coins | Yes |
| Decimals | 18 | Yes |

## The pool

Every coin gets its own Uniswap v4 pool against USDG. The whole supply goes into the pool as the starting liquidity, so the coin trades from the first block. The liquidity is locked forever because the Controller contract owns the position and has no function to withdraw or move it.

- The start price is 50,000 coins per 1 USDG. The starting market cap is about $20K.
- There is no bonding curve and no graduation.

| Parameter | Value |
|-----------|-------|
| Paired with | USDG |
| LP fee | 0 |
| Hook fee | 1% to 5% |
| Tick spacing | 200 |

## The hook

The Gmoon hook is a Uniswap v4 hook contract. All pools created through Gmoon use this hook. The hook has no owner and no proxy, so its logic can't be changed.

1. The hook takes a fee in USDG on every trade. See [Trading fees](trading-fees.md).
2. At the end of the trade, the hook sends the fee to the coin's [Earn Vault](vault-and-rewards.md).
3. For the first 10 seconds after launch, the hook charges a higher fee, see [Anti-sniper fee](trading-fees.md#anti-sniper-fee).

The vault splits the fee and converts it into rewards.
