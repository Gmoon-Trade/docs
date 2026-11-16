---
title: Overview
icon: lucide/book-open
---

# Protocol overview

Gmoon is a coin launchpad on Robinhood Chain. A coin launches in one transaction into its own Uniswap v4 pool with USDG and can be traded from the first block. There is no bonding curve and no graduation.

Every buy and sell in the pool pays a fee of 1% to 5%. The coin's Earn Vault gets 75% of the fee, and the protocol gets 25%. The creator takes their share of the vault's part, and holders who deposit the coin split the rest by their vault share. Rewards are paid in tokenized stocks, ETFs and crypto assets chosen by the coin's creator at launch. The stocks and ETFs are Robinhood Stock Tokens, each backed 1:1 by the underlying share. See [Reward assets](concepts/reward-assets.md).

## Coin launch

A launch is one transaction. It creates the coin, opens its pool with USDG and puts the whole supply into the pool. Every coin launches on the same terms:

- Every coin has a supply of 1B. No more coins can be created after launch.
- Every coin starts at a market cap of about $20K, or 50,000 coins for 1 USDG, before the creator's buy.
- The creator gets no coins at launch. They can buy up to 80% of the supply in the launch transaction, before anyone else can trade.
- The liquidity is locked in the pool forever.
- For the first 10 seconds an anti-sniper fee applies. It starts at 80% and falls to the coin's fee.

See [Coin and pool](concepts/coin-and-pool.md) and [Trading fees](concepts/trading-fees.md#anti-sniper-fee).

## What the creator sets

The creator sets four things at launch. None of them can be changed later.

| Setting | Range | What it decides |
|---------|-------|-----------------|
| Trading fee | 1% to 5% | How much every buy and sell pays |
| Creator share | 0% to 50% of the vault's 75% | Split between the creator and depositors |
| Reward assets | 1 to 8 assets out of 64 | What vault rewards are paid in |
| Asset weights | From 0.01% each, 100% in total | How the fees are split between the assets |

## Fee distribution

The hook sends every fee to the coin's Earn Vault. The vault keeps 75% for the creator and depositors, see [Vault and rewards](concepts/vault-and-rewards.md). The other 25% goes to the protocol. If the creator joined Gmoon with a referral code, the referrer gets 25% of the protocol's part, which is 6.25% of the whole fee.

Example coin:

- Trading fee: 2%
- Creator share: 10%
- Reward assets: NVDA, TSLA and SPY
- Creator's referral code: yes
- Trading volume: $1M
- Fees: $20K

<div class="gm-diagram" style="--w:699.1px">
<svg xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="13.2 22.5 932.1 406.9" style="--gm-cycle:5.7s;--gm-run:gm-run-57" role="img" aria-label="$1M of trading volume pays $20K in fees: $15K to the Earn Vault and $5K to the protocol. The vault converts its part into NVDA, TSLA and SPY: $1.5K to the creator and $13.5K to depositors. The protocol pays $1.25K to the referrer.">
  <defs>
    <clipPath id="gm-round" clipPathUnits="objectBoundingBox"><circle cx=".5" cy=".5" r=".5"/></clipPath>
    <!-- Stage 1: fees split into Earn Vault and Protocol. Stage 2: the vault converts into the assets while the protocol pays the referrer. Stage 3, from the moment stage 2 reaches the conversion: creator and depositors, both 85px from the conversion line. -->
    <mask id="ff-m0" maskUnits="userSpaceOnUse" x="0" y="0" width="1000" height="440"><path class="d-window" d="M122 240H200V150q0-10 10-10H308" pathLength="1" style="animation-delay:0s"/></mask>
    <mask id="ff-m1" maskUnits="userSpaceOnUse" x="0" y="0" width="1000" height="440"><path class="d-window" d="M122 240H200V330q0 10 10 10H308" pathLength="1" style="animation-delay:0s"/></mask>
    <mask id="ff-m2" maskUnits="userSpaceOnUse" x="0" y="0" width="1000" height="440"><path class="d-window" d="M372 140H555" pathLength="1" style="animation-delay:2.35s"/></mask>
    <mask id="ff-m3" maskUnits="userSpaceOnUse" x="0" y="0" width="1000" height="440"><path class="d-window" d="M372 340H568" pathLength="1" style="animation-delay:2.35s"/></mask>
    <mask id="ff-m4" maskUnits="userSpaceOnUse" x="0" y="0" width="1000" height="440"><path class="d-window" d="M645 140H740V65q0-10 10-10H828" pathLength="1" style="animation-delay:3.35s"/></mask>
    <mask id="ff-m5" maskUnits="userSpaceOnUse" x="0" y="0" width="1000" height="440"><path class="d-window" d="M645 140H740V215q0 10 10 10H828" pathLength="1" style="animation-delay:3.35s"/></mask>
  </defs>
  <path class="d-line" d="M122 240H200V150q0-10 10-10H308"/>
  <path class="d-line" d="M122 240H200V330q0 10 10 10H308"/>
  <path class="d-line" d="M372 140H555"/>
  <path class="d-line" d="M372 340H568"/>
  <path class="d-line" d="M645 140H740V65q0-10 10-10H828"/>
  <path class="d-line" d="M645 140H740V215q0 10 10 10H828"/>
  <path class="d-hot" d="M122 240H200V150q0-10 10-10H308" mask="url(#ff-m0)"/>
  <path class="d-hot" d="M122 240H200V330q0 10 10 10H308" mask="url(#ff-m1)"/>
  <path class="d-hot" d="M372 140H555" mask="url(#ff-m2)"/>
  <path class="d-hot" d="M372 340H568" mask="url(#ff-m3)"/>
  <path class="d-hot" d="M645 140H740V65q0-10 10-10H828" mask="url(#ff-m4)"/>
  <path class="d-hot" d="M645 140H740V215q0 10 10 10H828" mask="url(#ff-m5)"/>

  <circle class="d-node" cx="90" cy="240" r="32"/>
  <g class="d-icon" transform="translate(78 228)"><path d="M8 3 4 7l4 4M4 7h16M16 21l4-4-4-4M20 17H4"/></g>
  <text class="d-title" x="90" y="302">Trading volume</text>
  <text class="d-sub" x="90" y="326">$1M, 2% fee = $20K</text>
  <circle class="d-node" cx="340" cy="140" r="32"/>
  <g class="d-icon" transform="translate(328 128)"><path d="M10 18v-7M14 18v-7M18 18v-7M3 22h18M6 18v-7"/><path d="M11.119 2.205a2 2 0 0 1 1.762 0l7.84 3.846A.5.5 0 0 1 20.5 7h-17a.5.5 0 0 1-.22-.949z"/></g>
  <text class="d-title" x="340" y="202">Earn Vault</text>
  <text class="d-sub" x="340" y="226">75% of fees, $15K</text>
  <circle class="d-node" cx="340" cy="340" r="32"/>
  <svg class="d-mark" x="324" y="335" width="32" height="10" viewBox="-65 0 439 137">
    <path d="M-37.5625 0L-65 27.4H99.625V0Z"/>
    <path d="M-37.5625 54.8L-65 27.4V109.6L-37.5625 137H72.1875L99.625 109.6V54.8H17.3125V82.2H72.1875V109.6H-37.5625Z"/>
    <path d="M264.25 27.4H346.563V137H374V27.4L346.563 0H291.688Z"/>
    <path d="M154.5 0H127.062V137H154.5Z"/>
    <path d="M209.375 0H181.938L154.5 27.4H236.813V137H264.25V0Z"/>
  </svg>
  <text class="d-title" x="340" y="402">Protocol</text>
  <text class="d-sub" x="340" y="426">25% of fees, $5K</text>
  <rect class="d-pill" x="555" y="120" width="90" height="40" rx="20"/>
  <circle class="d-ring" cx="575" cy="140" r="18"/>
  <image xlink:href="assets/reward-icons/NVDA.svg" x="559" y="124" width="32" height="32" clip-path="url(#gm-round)"/>
  <circle class="d-ring" cx="600" cy="140" r="18"/>
  <image xlink:href="assets/reward-icons/TSLA.svg" x="584" y="124" width="32" height="32" clip-path="url(#gm-round)"/>
  <circle class="d-ring" cx="625" cy="140" r="18"/>
  <image xlink:href="assets/reward-icons/SPY.svg" x="609" y="124" width="32" height="32" clip-path="url(#gm-round)"/>
  <text class="d-sub" x="600" y="192">Converted into NVDA, TSLA, SPY</text>
  <circle class="d-node" cx="600" cy="340" r="32"/>
  <g class="d-icon" transform="translate(588 328)"><path d="M2 21a8 8 0 0 1 13.292-6M19 16v6M22 19h-6"/><circle cx="10" cy="8" r="5"/></g>
  <text class="d-title" x="600" y="402">Referrer</text>
  <text class="d-sub" x="600" y="426">25% of the protocol part, $1.25K</text>
  <circle class="d-node" cx="860" cy="55" r="32"/>
  <g class="d-icon" transform="translate(848 43)"><circle cx="12" cy="8" r="5"/><path d="M20 21a8 8 0 0 0-16 0"/></g>
  <text class="d-title" x="860" y="117">Creator</text>
  <text class="d-sub" x="860" y="141">10% of the vault, $1.5K</text>
  <circle class="d-node" cx="860" cy="225" r="32"/>
  <g class="d-icon" transform="translate(848 213)"><circle cx="10" cy="8" r="5"/><path d="M18 21a8 8 0 0 0-16 0M22 20c0-3.37-2-6.5-4-8a5 5 0 0 0-.45-8.3"/></g>
  <text class="d-title" x="860" y="287">Depositors</text>
  <text class="d-sub" x="860" y="311">90% of the vault, $13.5K</text>
</svg>
</div>

Fees by recipient:

| Recipient | Amount | Share of the fee |
|-----------|--------|------------------|
| Depositors | $13,500 | 67.5% |
| Creator | $1,500 | 7.5% |
| Creator's referrer | $1,250 | 6.25% |
| Protocol | $3,750 | 18.75% |
| **Total** | **$20,000** | **100%** |

## Explore the docs

<div class="u-cards u-cards--3" markdown>

[:lucide-rocket: **Launch a coin**<br>Pick reward assets, the fee and your share](guides/launch-a-coin.md){ .u-card }
[:lucide-arrow-left-right: **Trade**<br>Buy and sell coins with USDG](guides/trade.md){ .u-card }
[:lucide-landmark: **Earn**<br>Deposit coins in the Earn Vault and claim rewards](guides/earn.md){ .u-card }

</div>

<div class="u-cards u-cards--3" markdown>

[:lucide-user-round-plus: **Referrals**<br>Bring creators and earn fees from the coins they launch](guides/referrals.md){ .u-card }
[:lucide-chart-pie: **Reward assets**<br>Stocks, ETFs and crypto that rewards are paid in](concepts/reward-assets.md){ .u-card }
[:lucide-file-code: **Contracts**<br>Addresses of the protocol contracts](integration/contracts.md){ .u-card }

</div>
