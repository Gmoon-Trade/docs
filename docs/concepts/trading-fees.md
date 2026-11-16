---
icon: lucide/percent
---

# Trading fees

Every coin trades in a Uniswap v4 pool with USDG and the Gmoon hook. The hook charges a fee in USDG on every buy and sell in the pool. Transfers between wallets, deposits to the Earn Vault and withdrawals pay no fee.

At launch the creator sets:

| Setting | Range | Changes later? |
|---------|-------|----------------|
| Trading fee | 1% to 5% | No |
| Creator share of the vault part | 0% to 50% | No |
| Reward assets and weights | 1 to 8 assets | No |

## Buy fees

On a buy, the fee is taken from the USDG you pay. The rest of the USDG buys the coin.

For example, a coin has a 2% fee and you buy with 100 USDG. The fee is 2 USDG, and 98 USDG goes into the pool.

## Sell fees

On a sell, the fee is taken from the USDG the pool pays out. You receive the rest.

For example, a coin has a 2% fee and you sell coins for 100 USDG. The fee is 2 USDG, and you receive 98 USDG.

## Fee distribution

The hook sends every fee to the coin's Earn Vault. The vault keeps 75% for the creator and depositors, see [Vault and rewards](vault-and-rewards.md). The other 25% goes to the protocol. If the creator joined Gmoon with a referral code, the referrer gets 25% of the protocol's part, which is 6.25% of the whole fee.

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
  <image xlink:href="../../assets/reward-icons/NVDA.svg" x="559" y="124" width="32" height="32" clip-path="url(#gm-round)"/>
  <circle class="d-ring" cx="600" cy="140" r="18"/>
  <image xlink:href="../../assets/reward-icons/TSLA.svg" x="584" y="124" width="32" height="32" clip-path="url(#gm-round)"/>
  <circle class="d-ring" cx="625" cy="140" r="18"/>
  <image xlink:href="../../assets/reward-icons/SPY.svg" x="609" y="124" width="32" height="32" clip-path="url(#gm-round)"/>
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

## Anti-sniper fee

For the first 10 seconds after launch, the fee starts at 80% and falls linearly to the coin's fee. It drops by the same step every second and reaches the coin's fee at 10 seconds. The extra fee is split like the normal fee.

Example for a coin with a 2% fee. Hover over the chart to see the fee at each second:

<div class="gm-diagram gm-scrub" style="--w:660px" data-fee-start="80" data-fee-base="2" data-seconds="10" data-max="12" data-x0="140" data-dx="68" data-y0="300" data-ky="3">
<svg xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="90 28 880 312" style="--gm-cycle:5.7s;--gm-run:gm-run-57" role="img" aria-label="For a coin with a 2% fee, the fee is 80% at launch and falls in a straight line to 2% at 10 seconds, then stays at 2%.">
  <defs>
    <!-- The fee over the first 10 seconds for a coin with a 2% fee: a straight line from 80% to 2%. The white piece runs along it. -->
    <mask id="sn-m0" maskUnits="userSpaceOnUse" x="0" y="0" width="1000" height="350"><path class="d-window d-short" d="M140 60L820 294H956" pathLength="1" style="animation-delay:0s"/></mask>
  </defs>
  <path class="d-line d-curve" d="M140 60L820 294H956"/>
  <path class="d-hot d-curve" d="M140 60L820 294H956" mask="url(#sn-m0)"/>

  <path class="d-grid" d="M140 300H956"/>
  <text class="d-axis" x="124" y="305" style="text-anchor:end">0%</text>
  <path class="d-grid" d="M140 240H956"/>
  <text class="d-axis" x="124" y="245" style="text-anchor:end">20%</text>
  <path class="d-grid" d="M140 180H956"/>
  <text class="d-axis" x="124" y="185" style="text-anchor:end">40%</text>
  <path class="d-grid" d="M140 120H956"/>
  <text class="d-axis" x="124" y="125" style="text-anchor:end">60%</text>
  <path class="d-grid" d="M140 60H956"/>
  <text class="d-axis" x="124" y="65" style="text-anchor:end">80%</text>
  <text class="d-axis" x="140" y="332">0s</text>
  <text class="d-axis" x="208" y="332">1s</text>
  <text class="d-axis" x="276" y="332">2s</text>
  <text class="d-axis" x="344" y="332">3s</text>
  <text class="d-axis" x="412" y="332">4s</text>
  <text class="d-axis" x="480" y="332">5s</text>
  <text class="d-axis" x="548" y="332">6s</text>
  <text class="d-axis" x="616" y="332">7s</text>
  <text class="d-axis" x="684" y="332">8s</text>
  <text class="d-axis" x="752" y="332">9s</text>
  <text class="d-axis" x="820" y="332">10s</text>
  <text class="d-axis" x="888" y="332">11s</text>
  <text class="d-axis" x="956" y="332">12s</text>
  <circle class="d-dot" cx="140" cy="60" r="5"/>
  <text class="d-title d-note" x="140" y="42" style="text-anchor:middle">80%</text>
  <circle class="d-dot" cx="820" cy="294" r="5"/>
  <text class="d-title d-note" x="820" y="276" style="text-anchor:middle">2%</text>
</svg>
</div>


## Creator buy fees

The creator gets no coins at launch but can buy the coin in the launch transaction:

- The buy runs right after the pool opens, so nobody can trade before it.
- It pays the coin's fee, not the anti-sniper fee.
- It's capped at 80% of the supply, 800M coins.
- The coins go to the creator's wallet.

The creator's coins don't go into the Earn Vault automatically. To earn rewards on them, the creator deposits them like any other holder. A deposit doesn't change the creator share. The creator gets it as before, and the deposit earns depositor rewards on top of it.
