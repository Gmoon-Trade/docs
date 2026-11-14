---
icon: lucide/coins
---

# Vault and rewards

Every coin has its own Earn Vault. The vault receives 75% of the coin's trading fees and pays them out to the creator and to the holders who deposit the coin in it.

## How rewards are shared

Example: a coin with a 20% creator share. Holders A, B and C have deposited 500K, 300K and 200K coins, 1M in total. The vault has collected $5 of fees:

<div class="gm-diagram" style="--w:711px">
<svg xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="23.3 44.0 950.0 394.0" style="--gm-cycle:6.7s;--gm-run:gm-run-67" role="img" aria-label="$5 of fees in the Earn Vault is swapped into the reward assets: $1 to the creator, then $2.00, $1.20 and $0.80 to holders who deposited 500K, 300K and 200K coins.">
  <defs>
    <clipPath id="gm-round" clipPathUnits="objectBoundingBox"><circle cx=".5" cy=".5" r=".5"/></clipPath>
    <!-- Stage 1: fees reach the vault. Stage 2: the vault swaps them. Stage 3: from the swap to the fork, then to every recipient as the fork is reached. -->
    <mask id="vf-m0" maskUnits="userSpaceOnUse" x="0" y="0" width="1000" height="480"><path class="d-window" d="M122 240H268" pathLength="1" style="animation-delay:0s"/></mask>
    <mask id="vf-m1" maskUnits="userSpaceOnUse" x="0" y="0" width="1000" height="480"><path class="d-window" d="M332 240H455" pathLength="1" style="animation-delay:2.35s"/></mask>
    <mask id="vf-m2" maskUnits="userSpaceOnUse" x="0" y="0" width="1000" height="480"><path class="d-window" d="M545 240H600" pathLength="1" style="animation-delay:3.35s"/></mask>
    <mask id="vf-m3" maskUnits="userSpaceOnUse" x="0" y="0" width="1000" height="480"><path class="d-window" d="M600 240V85q0-10 10-10H628" pathLength="1" style="animation-delay:4.35s"/></mask>
    <mask id="vf-m4" maskUnits="userSpaceOnUse" x="0" y="0" width="1000" height="480"><path class="d-window" d="M600 240V195q0-10 10-10H628" pathLength="1" style="animation-delay:4.35s"/></mask>
    <mask id="vf-m5" maskUnits="userSpaceOnUse" x="0" y="0" width="1000" height="480"><path class="d-window" d="M600 240V285q0 10 10 10H628" pathLength="1" style="animation-delay:4.35s"/></mask>
    <mask id="vf-m6" maskUnits="userSpaceOnUse" x="0" y="0" width="1000" height="480"><path class="d-window" d="M600 240V395q0 10 10 10H628" pathLength="1" style="animation-delay:4.35s"/></mask>
  </defs>
  <path class="d-line" d="M122 240H268"/>
  <path class="d-line" d="M332 240H455"/>
  <path class="d-line" d="M545 240H600"/>
  <path class="d-line" d="M600 240V85q0-10 10-10H628"/>
  <path class="d-line" d="M600 240V195q0-10 10-10H628"/>
  <path class="d-line" d="M600 240V285q0 10 10 10H628"/>
  <path class="d-line" d="M600 240V395q0 10 10 10H628"/>
  <path class="d-hot" d="M122 240H268" mask="url(#vf-m0)"/>
  <path class="d-hot" d="M332 240H455" mask="url(#vf-m1)"/>
  <path class="d-hot" d="M545 240H600" mask="url(#vf-m2)"/>
  <path class="d-hot" d="M600 240V85q0-10 10-10H628" mask="url(#vf-m3)"/>
  <path class="d-hot" d="M600 240V195q0-10 10-10H628" mask="url(#vf-m4)"/>
  <path class="d-hot" d="M600 240V285q0 10 10 10H628" mask="url(#vf-m5)"/>
  <path class="d-hot" d="M600 240V395q0 10 10 10H628" mask="url(#vf-m6)"/>

  <circle class="d-node" cx="90" cy="240" r="32"/>
  <g class="d-icon" transform="translate(78 228)"><path d="M8 3 4 7l4 4M4 7h16M16 21l4-4-4-4M20 17H4"/></g>
  <text class="d-title" x="90" y="302">Trading fees</text>
  <text class="d-sub" x="90" y="326">The vault part, $5</text>
  <circle class="d-node" cx="300" cy="240" r="32"/>
  <g class="d-icon" transform="translate(288 228)"><path d="M10 18v-7M14 18v-7M18 18v-7M3 22h18M6 18v-7"/><path d="M11.119 2.205a2 2 0 0 1 1.762 0l7.84 3.846A.5.5 0 0 1 20.5 7h-17a.5.5 0 0 1-.22-.949z"/></g>
  <text class="d-title" x="300" y="302">Earn Vault</text>
  <text class="d-sub" x="300" y="326">1M coins deposited</text>
  <rect class="d-pill" x="455" y="220" width="90" height="40" rx="20"/>
  <circle class="d-ring" cx="475" cy="240" r="18"/>
  <image xlink:href="../../assets/reward-icons/NVDA.svg" x="459" y="224" width="32" height="32" clip-path="url(#gm-round)"/>
  <circle class="d-ring" cx="500" cy="240" r="18"/>
  <image xlink:href="../../assets/reward-icons/TSLA.svg" x="484" y="224" width="32" height="32" clip-path="url(#gm-round)"/>
  <circle class="d-ring" cx="525" cy="240" r="18"/>
  <image xlink:href="../../assets/reward-icons/SPY.svg" x="509" y="224" width="32" height="32" clip-path="url(#gm-round)"/>
  <text class="d-sub" x="500" y="292">Swapped every $5</text>
  <circle class="d-node" cx="660" cy="75" r="32"/>
  <g class="d-icon" transform="translate(648 63)"><circle cx="12" cy="8" r="5"/><path d="M20 21a8 8 0 0 0-16 0"/></g>
  <text class="d-title" x="708" y="69" style="text-anchor:start">Creator</text>
  <text class="d-sub" x="708" y="93" style="text-anchor:start">20% share, $1.00</text>
  <circle class="d-node" cx="660" cy="185" r="32"/>
  <g class="d-icon" transform="translate(648 173)"><circle cx="12" cy="8" r="5"/><path d="M20 21a8 8 0 0 0-16 0"/></g>
  <text class="d-title" x="708" y="179" style="text-anchor:start">Holder A</text>
  <text class="d-sub" x="708" y="203" style="text-anchor:start">500K coins, 50% of the rest, $2.00</text>
  <circle class="d-node" cx="660" cy="295" r="32"/>
  <g class="d-icon" transform="translate(648 283)"><circle cx="12" cy="8" r="5"/><path d="M20 21a8 8 0 0 0-16 0"/></g>
  <text class="d-title" x="708" y="289" style="text-anchor:start">Holder B</text>
  <text class="d-sub" x="708" y="313" style="text-anchor:start">300K coins, 30% of the rest, $1.20</text>
  <circle class="d-node" cx="660" cy="405" r="32"/>
  <g class="d-icon" transform="translate(648 393)"><circle cx="12" cy="8" r="5"/><path d="M20 21a8 8 0 0 0-16 0"/></g>
  <text class="d-title" x="708" y="399" style="text-anchor:start">Holder C</text>
  <text class="d-sub" x="708" y="423" style="text-anchor:start">200K coins, 20% of the rest, $0.80</text>
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
