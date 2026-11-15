---
icon: lucide/droplets
---

# Coin and pool

What a launch creates in one transaction: the coin, its Uniswap v4 pool with USDG, the starting price, the liquidity and the creator's buy.

## The coin

| | |
|-|-|
| Supply | 1,000,000,000, fixed. Nothing is minted later. |
| Decimals | 18 |
| Standard | ERC-20 with ERC-165 and ERC-1046 (on-chain metadata) |
| Metadata | Image, description, X, Telegram, Farcaster and website. Admins can update the image and the description. |

## The pool

Every coin gets its own Uniswap v4 pool against USDG:

- The whole supply goes into the pool as the starting liquidity, so the coin trades from the first block.
- The start price is 50,000 coins per 1 USDG, a market cap of about $20K.
- There is no bonding curve and no graduation. The coin trades in the same pool for its whole life.
- The pool's own LP fee is 0. The trading fee is charged by the Gmoon Hook in USDG. See [Trading fees](trading-fees.md).

## The creator's buy

The creator can buy their own coin in the launch transaction, before anyone else can trade. They can take up to 80% of the supply. The buy pays the coin's own fee, not the [anti-sniper fee](anti-sniper-fee.md).

## What the creator sets

| Setting | Range | Changes later? |
|---------|-------|----------------|
| Trading fee | 1% to 5% | No |
| Creator share of the vault part | 0% to 50% | No |
| Reward assets and weights | 1 to 8 assets | No |

## The Earn Vault

Each launch also registers an Earn Vault for the coin. See [Vault and rewards](vault-and-rewards.md).
