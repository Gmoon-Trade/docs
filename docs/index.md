---
title: Overview
icon: lucide/book-open
---

# Protocol overview

Gmoon is a coin launchpad on Robinhood Chain. Every coin launches in one transaction straight into its own Uniswap v4 pool paired with USDG, so trading is live from the first block, with no bonding curve and no graduation. Every coin has a fixed supply of 1B and starts at a market cap of about $20K.

Each coin has a trading fee from 1% to 5%, set by its creator at launch and charged on every buy and sell. Most of the fee goes to the coin's Earn Vault. Holders who deposit their coins in the vault share these fees in proportion to their deposit and receive them in a basket of tokenized stocks, ETFs and crypto assets that the creator picks at launch. The rest of the fee goes to the protocol.

## How a fee moves

1. A buy or sell pays the trading fee in USDG: 75% goes to the Earn Vault and 25% to the protocol.
2. Every time the vault has collected $5, it swaps the amount into the coin's reward assets by their weights.
3. The creator receives their share of the vault rewards, from 0% to 50%. Depositors share the rest and can claim it at any time.

A $1,000 buy of a coin with a 2% fee and a 20% creator share:

<div class="gm-diagram">
<!-- Icons: Lucide (lucide.dev), stroke 2 at 24px: arrow-left-right, landmark, user-round, users-round, user-round-plus -->
<svg xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 1000 430" role="img" aria-label="A $20 fee on a $1,000 buy splits into $15 for the Vault and $5 for the protocol. The Vault swaps its part into NVDA, TSLA and SPY: $3 to the creator and $12 to depositors. The protocol pays $1.25 of its part to the referrer.">
  <defs>
    <clipPath id="gm-round" clipPathUnits="objectBoundingBox"><circle cx=".5" cy=".5" r=".5"/></clipPath>
    <!-- The fee moves in steps: 1) trade splits into Vault and Protocol at once, 2) Vault swaps into the assets while
         Protocol pays the referrer, 3) the assets split between creator and depositors at once. Each segment is a white
         copy of its dashed line, revealed by a mask that draws on in its step. -->
    <mask id="gm-m1a" maskUnits="userSpaceOnUse" x="0" y="0" width="1000" height="430"><path class="d-window d-step1" d="M122 225H200V130q0-10 10-10H308" pathLength="1"/></mask>
    <mask id="gm-m1b" maskUnits="userSpaceOnUse" x="0" y="0" width="1000" height="430"><path class="d-window d-step1" d="M122 225H200V320q0 10 10 10H308" pathLength="1"/></mask>
    <mask id="gm-m2a" maskUnits="userSpaceOnUse" x="0" y="0" width="1000" height="430"><path class="d-window d-step2" d="M372 120H555" pathLength="1"/></mask>
    <mask id="gm-m2b" maskUnits="userSpaceOnUse" x="0" y="0" width="1000" height="430"><path class="d-window d-step2" d="M372 330H568" pathLength="1"/></mask>
    <mask id="gm-m3a" maskUnits="userSpaceOnUse" x="0" y="0" width="1000" height="430"><path class="d-window d-step3" d="M645 120H740V70q0-10 10-10H828" pathLength="1"/></mask>
    <mask id="gm-m3b" maskUnits="userSpaceOnUse" x="0" y="0" width="1000" height="430"><path class="d-window d-step3" d="M645 120H740V220q0 10 10 10H828" pathLength="1"/></mask>
  </defs>

  <path class="d-line" d="M122 225H200V130q0-10 10-10H308"/>
  <path class="d-line" d="M122 225H200V320q0 10 10 10H308"/>
  <path class="d-line" d="M372 120H555"/>
  <path class="d-line" d="M372 330H568"/>
  <path class="d-line" d="M645 120H740V70q0-10 10-10H828"/>
  <path class="d-line" d="M645 120H740V220q0 10 10 10H828"/>
  <path class="d-hot" d="M122 225H200V130q0-10 10-10H308" mask="url(#gm-m1a)"/>
  <path class="d-hot" d="M122 225H200V320q0 10 10 10H308" mask="url(#gm-m1b)"/>
  <path class="d-hot" d="M372 120H555" mask="url(#gm-m2a)"/>
  <path class="d-hot" d="M372 330H568" mask="url(#gm-m2b)"/>
  <path class="d-hot" d="M645 120H740V70q0-10 10-10H828" mask="url(#gm-m3a)"/>
  <path class="d-hot" d="M645 120H740V220q0 10 10 10H828" mask="url(#gm-m3b)"/>

  <!-- trade -->
  <circle class="d-node" cx="90" cy="225" r="32"/>
  <g class="d-icon" transform="translate(78 213)"><path d="M8 3 4 7l4 4M4 7h16M16 21l4-4-4-4M20 17H4"/></g>
  <text class="d-title" x="90" y="285">Buy or sell</text>
  <text class="d-sub" x="90" y="305">$1,000 trade, 2% fee = $20</text>

  <!-- vault -->
  <circle class="d-node" cx="340" cy="120" r="32"/>
  <g class="d-icon" transform="translate(328 108)"><path d="M10 18v-7M14 18v-7M18 18v-7M3 22h18M6 18v-7"/><path d="M11.119 2.205a2 2 0 0 1 1.762 0l7.84 3.846A.5.5 0 0 1 20.5 7h-17a.5.5 0 0 1-.22-.949z"/></g>
  <text class="d-title" x="340" y="180">Earn Vault</text>
  <text class="d-sub" x="340" y="200">75% of the fee, $15</text>

  <!-- protocol: GM mark, the vector from front src/pages/live-profile.tsx (ProfileGm), transparent -->
  <circle class="d-node" cx="340" cy="330" r="32"/>
  <svg class="d-mark" x="324" y="325" width="32" height="10" viewBox="-65 0 439 137">
    <path d="M-37.5625 0L-65 27.4H99.625V0Z"/>
    <path d="M-37.5625 54.8L-65 27.4V109.6L-37.5625 137H72.1875L99.625 109.6V54.8H17.3125V82.2H72.1875V109.6H-37.5625Z"/>
    <path d="M264.25 27.4H346.563V137H374V27.4L346.563 0H291.688Z"/>
    <path d="M154.5 0H127.062V137H154.5Z"/>
    <path d="M209.375 0H181.938L154.5 27.4H236.813V137H264.25V0Z"/>
  </svg>
  <text class="d-title" x="340" y="390">Protocol</text>
  <text class="d-sub" x="340" y="410">25% of the fee, $5</text>

  <!-- reward assets: front .pair-badge scaled ~1.8x (bg-3 pill, 2px inset, icons overlap, ring in the pill colour) -->
  <rect class="d-pill" x="555" y="100" width="90" height="40" rx="20"/>
  <circle class="d-ring" cx="575" cy="120" r="18"/>
  <image xlink:href="assets/reward-icons/NVDA.svg" x="559" y="104" width="32" height="32" clip-path="url(#gm-round)"/>
  <circle class="d-ring" cx="600" cy="120" r="18"/>
  <image xlink:href="assets/reward-icons/TSLA.svg" x="584" y="104" width="32" height="32" clip-path="url(#gm-round)"/>
  <circle class="d-ring" cx="625" cy="120" r="18"/>
  <image xlink:href="assets/reward-icons/SPY.svg" x="609" y="104" width="32" height="32" clip-path="url(#gm-round)"/>
  <text class="d-sub" x="600" y="168">Swapped into NVDA, TSLA, SPY</text>

  <!-- referrer -->
  <circle class="d-node" cx="600" cy="330" r="32"/>
  <g class="d-icon" transform="translate(588 318)"><path d="M2 21a8 8 0 0 1 13.292-6M19 16v6M22 19h-6"/><circle cx="10" cy="8" r="5"/></g>
  <text class="d-title" x="600" y="390">Referrer</text>
  <text class="d-sub" x="600" y="410">25% of the protocol part, $1.25</text>

  <!-- creator -->
  <circle class="d-node" cx="860" cy="60" r="32"/>
  <g class="d-icon" transform="translate(848 48)"><circle cx="12" cy="8" r="5"/><path d="M20 21a8 8 0 0 0-16 0"/></g>
  <text class="d-title" x="860" y="120">Creator</text>
  <text class="d-sub" x="860" y="140">20% of the Vault, $3</text>

  <!-- depositors -->
  <circle class="d-node" cx="860" cy="230" r="32"/>
  <g class="d-icon" transform="translate(848 218)"><circle cx="10" cy="8" r="5"/><path d="M18 21a8 8 0 0 0-16 0M22 20c0-3.37-2-6.5-4-8a5 5 0 0 0-.45-8.3"/></g>
  <text class="d-title" x="860" y="290">Depositors</text>
  <text class="d-sub" x="860" y="310">80% of the Vault, $12</text>
</svg>
</div>

## Explore the docs

<div class="u-cards u-cards--3" markdown>

[:lucide-zap: **Quick start**<br>Set up a wallet and buy your first coin](quick-start.md){ .u-card }
[:lucide-rocket: **Launch a coin**<br>Pick reward assets, the fee and your share](guides/launch-a-coin.md){ .u-card }
[:lucide-arrow-left-right: **Trade**<br>Buy and sell coins with USDG or ETH](guides/trade.md){ .u-card }

</div>

<div class="u-cards u-cards--3" markdown>

[:lucide-landmark: **Earn**<br>Deposit coins in the Earn Vault and claim rewards](guides/earn.md){ .u-card }
[:lucide-user-round-plus: **Referrals**<br>Bring creators and earn from their fees](guides/referrals.md){ .u-card }
[:lucide-file-code: **Contracts**<br>Addresses of the protocol contracts](resources/contracts.md){ .u-card }

</div>
