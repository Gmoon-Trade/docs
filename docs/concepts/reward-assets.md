---
icon: lucide/chart-pie
---

# Reward assets

Vault rewards are paid in assets, not in USDG. Each coin pays its rewards in a basket of assets that the creator picks at launch.

## The list

Rewards can be paid in 64 assets on Robinhood Chain: 51 tokenized stocks, 7 ETFs (including gold and silver) and 6 crypto assets (cbBTC, WETH and the community coins PONS, CASHCAT, AI and ORBIO). The list grows over time. See [Supported assets](../resources/supported-assets.md) for every asset and its contract.

## The basket

The creator picks from 1 to 8 assets and gives each a weight. The weights add up to 100%. The basket can't be changed after launch.

Every time the vault swaps collected fees, it splits the amount by these weights. A $5 conversion with NVDA 50%, TSLA 30% and SPY 20%:

<div class="gm-diagram">
<svg xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 1000 400" role="img" aria-label="A $5 conversion with weights NVDA 50%, TSLA 30% and SPY 20% buys $2.50 of NVDA, $1.50 of TSLA and $1.00 of SPY.">
  <defs>
    <clipPath id="gm-round" clipPathUnits="objectBoundingBox"><circle cx=".5" cy=".5" r=".5"/></clipPath>
    <!-- One step: the collected USDG splits by weight into every reward asset at once. -->
    <mask id="ra-m0" maskUnits="userSpaceOnUse" x="0" y="0" width="1000" height="400"><path class="d-window d-step1" d="M232 180H460" pathLength="1"/></mask>
    <mask id="ra-m1" maskUnits="userSpaceOnUse" x="0" y="0" width="1000" height="400"><path class="d-window d-step1" d="M460 180V70q0-10 10-10H668" pathLength="1"/></mask>
    <mask id="ra-m2" maskUnits="userSpaceOnUse" x="0" y="0" width="1000" height="400"><path class="d-window d-step1" d="M460 180H668" pathLength="1"/></mask>
    <mask id="ra-m3" maskUnits="userSpaceOnUse" x="0" y="0" width="1000" height="400"><path class="d-window d-step1" d="M460 180V290q0 10 10 10H668" pathLength="1"/></mask>
  </defs>
  <path class="d-line" d="M232 180H460"/>
  <path class="d-line" d="M460 180V70q0-10 10-10H668"/>
  <path class="d-line" d="M460 180H668"/>
  <path class="d-line" d="M460 180V290q0 10 10 10H668"/>
  <path class="d-hot" d="M232 180H460" mask="url(#ra-m0)"/>
  <path class="d-hot" d="M460 180V70q0-10 10-10H668" mask="url(#ra-m1)"/>
  <path class="d-hot" d="M460 180H668" mask="url(#ra-m2)"/>
  <path class="d-hot" d="M460 180V290q0 10 10 10H668" mask="url(#ra-m3)"/>

  <circle class="d-node" cx="200" cy="180" r="32"/>
  <image xlink:href="../../assets/reward-icons/USDG.svg" x="184" y="164" width="32" height="32" clip-path="url(#gm-round)"/>
  <text class="d-title" x="200" y="240">Collected fees</text>
  <text class="d-sub" x="200" y="260">$5 USDG</text>
  <circle class="d-node" cx="700" cy="60" r="32"/>
  <image xlink:href="../../assets/reward-icons/NVDA.svg" x="684" y="44" width="32" height="32" clip-path="url(#gm-round)"/>
  <text class="d-title" x="700" y="120">NVDA, weight 50%</text>
  <text class="d-sub" x="700" y="140">$2.50</text>
  <circle class="d-node" cx="700" cy="180" r="32"/>
  <image xlink:href="../../assets/reward-icons/TSLA.svg" x="684" y="164" width="32" height="32" clip-path="url(#gm-round)"/>
  <text class="d-title" x="700" y="240">TSLA, weight 30%</text>
  <text class="d-sub" x="700" y="260">$1.50</text>
  <circle class="d-node" cx="700" cy="300" r="32"/>
  <image xlink:href="../../assets/reward-icons/SPY.svg" x="684" y="284" width="32" height="32" clip-path="url(#gm-round)"/>
  <text class="d-title" x="700" y="360">SPY, weight 20%</text>
  <text class="d-sub" x="700" y="380">$1.00</text>
</svg>
</div>
