---
icon: lucide/arrow-left-right
---

# Trade

Open any coin on [gmoon.trade](https://gmoon.trade) and use the trade widget on its page. Every coin trades in its own Uniswap v4 pool against USDG, so trading is open from the first block.

## Buy

1. Choose **Buy** and what you pay with: **USDG** or **ETH**.
2. Enter the amount. The widget shows how many coins you get and the minimum you accept after slippage (1% by default).
3. Confirm the approvals the wallet asks for and then the swap.

With USDG the first purchase asks for an approval. With a wallet that supports atomic batches, the approvals and the swap are sent as one confirmation.

Paying with ETH is two swaps in one press: ETH is swapped to USDG through a Uniswap v3 pool, then the USDG buys the coin. You pick the v3 fee tier and see the quote for each. Keep some ETH for the network fee.

## Sell

Choose **Sell**, enter the amount of coins and confirm. You receive USDG.

## What you pay

Every buy and sell pays the coin's trading fee in USDG, from 1% to 5% as set by its creator. The price shown in the widget already includes it.

For the first 10 seconds after a coin launches the fee is higher: it starts at 80% and falls to the coin's fee. A buy in the first seconds can cost most of the amount in fees. See [Anti-sniper fee](../concepts/anti-sniper-fee.md).

## Where the fee goes

Most of the fee goes to the coin's Earn Vault, so holders who deposit the coin earn from every trade. Deposit your coins to share in it: see [Earn](earn.md).

## Trading from code

See [Buying and selling](../integration/buying-and-selling.md).
