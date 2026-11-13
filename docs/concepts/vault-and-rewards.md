---
icon: lucide/coins
---

# Vault and rewards

Every coin has its own Earn Vault. The vault receives 75% of the coin's trading fees and pays them out to the creator and to the holders who deposit the coin in it.

## How rewards are shared

A $5 conversion in a vault with 1M coins deposited and a 20% creator share:

<div class="gm-diagram">
<svg xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 1000 480" role="img" aria-label="Three holders deposit 500K, 300K and 200K coins. A $5 conversion pays the creator $1 and the holders $2.00, $1.20 and $0.80.">
  <defs>
    <clipPath id="gm-round" clipPathUnits="objectBoundingBox"><circle cx=".5" cy=".5" r=".5"/></clipPath>
    <!-- Step 1: deposits flow into the vault. Step 2: the vault swaps $5 into the reward assets. Step 3: rewards split between the creator and the holders, starting as step 2 reaches the swap. -->
    <mask id="vr-m0" maskUnits="userSpaceOnUse" x="0" y="0" width="1000" height="480"><path class="d-window d-step1" d="M122 100H200q10 0 10 10V240" pathLength="1"/></mask>
    <mask id="vr-m1" maskUnits="userSpaceOnUse" x="0" y="0" width="1000" height="480"><path class="d-window d-step1" d="M122 240H328" pathLength="1"/></mask>
    <mask id="vr-m2" maskUnits="userSpaceOnUse" x="0" y="0" width="1000" height="480"><path class="d-window d-step1" d="M122 380H200q10 0 10-10V240" pathLength="1"/></mask>
    <mask id="vr-m3" maskUnits="userSpaceOnUse" x="0" y="0" width="1000" height="480"><path class="d-window d-step2" d="M392 240H560" pathLength="1"/></mask>
    <mask id="vr-m4" maskUnits="userSpaceOnUse" x="0" y="0" width="1000" height="480"><path class="d-window d-step3" d="M650 240H700" pathLength="1"/></mask>
    <mask id="vr-m5" maskUnits="userSpaceOnUse" x="0" y="0" width="1000" height="480"><path class="d-window d-step3" d="M700 240V85q0-10 10-10H768" pathLength="1"/></mask>
    <mask id="vr-m6" maskUnits="userSpaceOnUse" x="0" y="0" width="1000" height="480"><path class="d-window d-step3" d="M700 240V195q0-10 10-10H768" pathLength="1"/></mask>
    <mask id="vr-m7" maskUnits="userSpaceOnUse" x="0" y="0" width="1000" height="480"><path class="d-window d-step3" d="M700 240V285q0 10 10 10H768" pathLength="1"/></mask>
    <mask id="vr-m8" maskUnits="userSpaceOnUse" x="0" y="0" width="1000" height="480"><path class="d-window d-step3" d="M700 240V395q0 10 10 10H768" pathLength="1"/></mask>
  </defs>
  <path class="d-line" d="M122 100H200q10 0 10 10V240"/>
  <path class="d-line" d="M122 240H328"/>
  <path class="d-line" d="M122 380H200q10 0 10-10V240"/>
  <path class="d-line" d="M392 240H560"/>
  <path class="d-line" d="M650 240H700"/>
  <path class="d-line" d="M700 240V85q0-10 10-10H768"/>
  <path class="d-line" d="M700 240V195q0-10 10-10H768"/>
  <path class="d-line" d="M700 240V285q0 10 10 10H768"/>
  <path class="d-line" d="M700 240V395q0 10 10 10H768"/>
  <path class="d-hot" d="M122 100H200q10 0 10 10V240" mask="url(#vr-m0)"/>
  <path class="d-hot" d="M122 240H328" mask="url(#vr-m1)"/>
  <path class="d-hot" d="M122 380H200q10 0 10-10V240" mask="url(#vr-m2)"/>
  <path class="d-hot" d="M392 240H560" mask="url(#vr-m3)"/>
  <path class="d-hot" d="M650 240H700" mask="url(#vr-m4)"/>
  <path class="d-hot" d="M700 240V85q0-10 10-10H768" mask="url(#vr-m5)"/>
  <path class="d-hot" d="M700 240V195q0-10 10-10H768" mask="url(#vr-m6)"/>
  <path class="d-hot" d="M700 240V285q0 10 10 10H768" mask="url(#vr-m7)"/>
  <path class="d-hot" d="M700 240V395q0 10 10 10H768" mask="url(#vr-m8)"/>

  <circle class="d-node" cx="90" cy="100" r="32"/>
  <g class="d-icon" transform="translate(78 88)"><circle cx="12" cy="8" r="5"/><path d="M20 21a8 8 0 0 0-16 0"/></g>
  <text class="d-title" x="90" y="160">Holder A</text>
  <text class="d-sub" x="90" y="180">Deposits 500K coins</text>
  <circle class="d-node" cx="90" cy="240" r="32"/>
  <g class="d-icon" transform="translate(78 228)"><circle cx="12" cy="8" r="5"/><path d="M20 21a8 8 0 0 0-16 0"/></g>
  <text class="d-title" x="90" y="300">Holder B</text>
  <text class="d-sub" x="90" y="320">Deposits 300K coins</text>
  <circle class="d-node" cx="90" cy="380" r="32"/>
  <g class="d-icon" transform="translate(78 368)"><circle cx="12" cy="8" r="5"/><path d="M20 21a8 8 0 0 0-16 0"/></g>
  <text class="d-title" x="90" y="440">Holder C</text>
  <text class="d-sub" x="90" y="460">Deposits 200K coins</text>
  <circle class="d-node" cx="360" cy="240" r="32"/>
  <g class="d-icon" transform="translate(348 228)"><path d="M10 18v-7M14 18v-7M18 18v-7M3 22h18M6 18v-7"/><path d="M11.119 2.205a2 2 0 0 1 1.762 0l7.84 3.846A.5.5 0 0 1 20.5 7h-17a.5.5 0 0 1-.22-.949z"/></g>
  <text class="d-title" x="360" y="300">Earn Vault</text>
  <text class="d-sub" x="360" y="320">1M coins deposited</text>
  <rect class="d-pill" x="560" y="220" width="90" height="40" rx="20"/>
  <circle class="d-ring" cx="580" cy="240" r="18"/>
  <image xlink:href="../../assets/reward-icons/NVDA.svg" x="564" y="224" width="32" height="32" clip-path="url(#gm-round)"/>
  <circle class="d-ring" cx="605" cy="240" r="18"/>
  <image xlink:href="../../assets/reward-icons/TSLA.svg" x="589" y="224" width="32" height="32" clip-path="url(#gm-round)"/>
  <circle class="d-ring" cx="630" cy="240" r="18"/>
  <image xlink:href="../../assets/reward-icons/SPY.svg" x="614" y="224" width="32" height="32" clip-path="url(#gm-round)"/>
  <text class="d-sub" x="605" y="290">Swapped every $5</text>
  <circle class="d-node" cx="800" cy="75" r="32"/>
  <g class="d-icon" transform="translate(788 63)"><circle cx="12" cy="8" r="5"/><path d="M20 21a8 8 0 0 0-16 0"/></g>
  <text class="d-title" x="848" y="71" style="text-anchor:start">Creator</text>
  <text class="d-sub" x="848" y="91" style="text-anchor:start">20% share, $1.00</text>
  <circle class="d-node" cx="800" cy="185" r="32"/>
  <g class="d-icon" transform="translate(788 173)"><circle cx="12" cy="8" r="5"/><path d="M20 21a8 8 0 0 0-16 0"/></g>
  <text class="d-title" x="848" y="181" style="text-anchor:start">Holder A</text>
  <text class="d-sub" x="848" y="201" style="text-anchor:start">50% of the rest, $2.00</text>
  <circle class="d-node" cx="800" cy="295" r="32"/>
  <g class="d-icon" transform="translate(788 283)"><circle cx="12" cy="8" r="5"/><path d="M20 21a8 8 0 0 0-16 0"/></g>
  <text class="d-title" x="848" y="291" style="text-anchor:start">Holder B</text>
  <text class="d-sub" x="848" y="311" style="text-anchor:start">30% of the rest, $1.20</text>
  <circle class="d-node" cx="800" cy="405" r="32"/>
  <g class="d-icon" transform="translate(788 393)"><circle cx="12" cy="8" r="5"/><path d="M20 21a8 8 0 0 0-16 0"/></g>
  <text class="d-title" x="848" y="401" style="text-anchor:start">Holder C</text>
  <text class="d-sub" x="848" y="421" style="text-anchor:start">20% of the rest, $0.80</text>
</svg>
</div>

1. **Deposit.** Holders deposit their coins in the vault. A depositor's share of the vault is their deposit divided by all coins deposited. There is no minimum deposit.
2. **Swap.** Fees reach the vault in USDG. Every time the collected amount reaches $5, the vault swaps it into the coin's reward assets by their weights.
3. **Split.** The creator receives their share of the swapped rewards, from 0% to 50%. The rest is split between depositors in proportion to their share of the vault at that moment.
4. **Claim.** Rewards stay in the vault until claimed. Depositors can claim them at any time.

## Withdraw

A depositor can withdraw their coins from the vault. Withdrawn coins stop earning: rewards go only to coins that are in the vault when a swap happens.

## No depositors

While nothing is deposited, the creator receives the whole vault part of the fees.
