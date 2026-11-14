---
icon: lucide/shield
---

# Anti-sniper fee

For the first 10 seconds after a coin launches, its trading fee starts at 80% and falls linearly to the fee set by the creator. After that the coin trades at its own fee for good.

The high start makes buying a large share of the supply in the first blocks very expensive, so the creator doesn't need to buy up their own coin to protect it from snipers.

## How the fee falls

The fee for a coin with a 2% fee:

<div class="gm-diagram" style="--w:674.0px">
<svg xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="90.5 30.7 898.6 301.1" style="--gm-cycle:5.7s;--gm-run:gm-run-57" role="img" aria-label="For a coin with a 2% fee, the fee is 80% at launch and falls in a straight line to 2% at 10 seconds.">
  <defs>
    <clipPath id="gm-round" clipPathUnits="objectBoundingBox"><circle cx=".5" cy=".5" r=".5"/></clipPath>
    <!-- The fee over the first 10 seconds for a coin with a 2% fee: a straight line from 80% to 2%. The white piece runs along it. -->
    <mask id="sn-m0" maskUnits="userSpaceOnUse" x="0" y="0" width="1000" height="350"><path class="d-window" d="M140 60L820 294H880" pathLength="1" style="animation-delay:0s"/></mask>
  </defs>
  <path class="d-line d-curve" d="M140 60L820 294H880"/>
  <path class="d-hot d-curve" d="M140 60L820 294H880" mask="url(#sn-m0)"/>

  <path class="d-grid" d="M140 300H880"/>
  <text class="d-axis" x="124" y="305" style="text-anchor:end">0%</text>
  <path class="d-grid" d="M140 240H880"/>
  <text class="d-axis" x="124" y="245" style="text-anchor:end">20%</text>
  <path class="d-grid" d="M140 180H880"/>
  <text class="d-axis" x="124" y="185" style="text-anchor:end">40%</text>
  <path class="d-grid" d="M140 120H880"/>
  <text class="d-axis" x="124" y="125" style="text-anchor:end">60%</text>
  <path class="d-grid" d="M140 60H880"/>
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
  <circle class="d-dot" cx="140" cy="60" r="5"/>
  <text class="d-title" x="154" y="44" style="text-anchor:start">80% at launch</text>
  <circle class="d-dot" cx="820" cy="294" r="5"/>
  <text class="d-title" x="834" y="280" style="text-anchor:start">2%, the coin's fee</text>
</svg>
</div>

The fee falls in a straight line: each second it loses one tenth of the gap between 80% and the coin's fee.

| Time after launch | Fee |
|-------------------|-----|
| 0 s | 80% |
| 1 s | 72.2% |
| 2 s | 64.4% |
| 5 s | 41% |
| 8 s | 17.6% |
| 9 s | 9.8% |
| 10 s | 2% |

## The creator's buy

The creator can buy their own coin in the launch transaction. This buy pays the coin's own fee, not the anti-sniper fee.
