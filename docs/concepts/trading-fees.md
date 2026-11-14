---
icon: lucide/percent
---

# Trading fees

Every coin has one trading fee. The creator sets it at launch, from 1% to 5% in steps of 0.1%, and it can't be changed later. The fee is charged in USDG on every buy and sell of the coin.

## How the fee is split

Example: a creator launches a coin with a 2% trading fee and a 20% creator share, picks NVDA, TSLA and SPY as reward assets, and joined Gmoon with someone's referral code. The coin trades $1M in volume, so buys and sells pay $20K in fees:

<div class="gm-diagram" style="--w:699.1px">
<svg xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="13.2 22.5 932.1 406.9" style="--gm-cycle:5.7s;--gm-run:gm-run-57" role="img" aria-label="$1M of trading volume pays $20K in fees: $15K to the Earn Vault and $5K to the protocol. The vault swaps its part into NVDA, TSLA and SPY: $3K to the creator and $12K to depositors. The protocol pays $1.25K to the referrer.">
  <defs>
    <clipPath id="gm-round" clipPathUnits="objectBoundingBox"><circle cx=".5" cy=".5" r=".5"/></clipPath>
    <!-- Stage 1: fees split into Earn Vault and Protocol. Stage 2: the vault swaps into the assets while the protocol pays the referrer. Stage 3, from the moment stage 2 reaches the swap: creator and depositors, both 85px from the swap line. -->
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
  <text class="d-sub" x="600" y="192">Swapped into NVDA, TSLA, SPY</text>
  <circle class="d-node" cx="600" cy="340" r="32"/>
  <g class="d-icon" transform="translate(588 328)"><path d="M2 21a8 8 0 0 1 13.292-6M19 16v6M22 19h-6"/><circle cx="10" cy="8" r="5"/></g>
  <text class="d-title" x="600" y="402">Referrer</text>
  <text class="d-sub" x="600" y="426">25% of the protocol part, $1.25K</text>
  <circle class="d-node" cx="860" cy="55" r="32"/>
  <g class="d-icon" transform="translate(848 43)"><circle cx="12" cy="8" r="5"/><path d="M20 21a8 8 0 0 0-16 0"/></g>
  <text class="d-title" x="860" y="117">Creator</text>
  <text class="d-sub" x="860" y="141">20% of the vault, $3K</text>
  <circle class="d-node" cx="860" cy="225" r="32"/>
  <g class="d-icon" transform="translate(848 213)"><circle cx="10" cy="8" r="5"/><path d="M18 21a8 8 0 0 0-16 0M22 20c0-3.37-2-6.5-4-8a5 5 0 0 0-.45-8.3"/></g>
  <text class="d-title" x="860" y="287">Depositors</text>
  <text class="d-sub" x="860" y="311">80% of the vault, $12K</text>
</svg>
</div>

1. **Earn Vault, 75% of the fee.** The creator share, set at launch from 0% to 50%, goes to the creator. The rest goes to the holders who deposited the coin in its Earn Vault. While nothing is deposited, the creator receives the whole vault part.
2. **Protocol, 25% of the fee.** If the coin's creator joined Gmoon with someone's referral code, 25% of the protocol part goes to that referrer. This is 6.25% of each fee on the coin.

## Example

The same $1M of volume, recipient by recipient:

| Recipient | Share of the fee | Amount |
|-----------|------------------|--------|
| Depositors | 60% | $12,000 |
| Creator | 15% | $3,000 |
| Creator's referrer | 6.25% | $1,250 |
| Protocol | 18.75% | $3,750 |
| **Total fee** | **100%** | **$20,000** |

## Launch fee

For the first 10 seconds after launch a higher fee applies: it starts at 80% and falls to the fee set by the creator. See [Anti-sniper fee](anti-sniper-fee.md).
