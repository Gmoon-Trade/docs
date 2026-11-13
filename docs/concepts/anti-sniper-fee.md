---
icon: lucide/shield
---

# Anti-sniper fee

For the first 10 seconds after a coin launches, its trading fee starts at 80% and falls every second to the fee set by the creator. After that the coin trades at its own fee for good.

The high start makes buying a large share of the supply in the first blocks very expensive, so the creator doesn't need to buy up their own coin to protect it from snipers.

## How the fee falls

The fee for a coin with a 2% fee, second by second:

<div class="gm-diagram">
<svg xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 1000 380" role="img" aria-label="For a coin with a 2% fee, the fee is 80% at launch and falls every second to 2% at 10 seconds.">
  <defs>
    <clipPath id="gm-round" clipPathUnits="objectBoundingBox"><circle cx=".5" cy=".5" r=".5"/></clipPath>
    <!-- A step line: the fee for each second after launch, for a coin with a 2% fee. The white piece runs along it. -->
    <mask id="as-m0" maskUnits="userSpaceOnUse" x="0" y="0" width="1000" height="380"><path class="d-window d-step1" d="M140 60H212V83.4H284V106.8H356V130.2H428V153.6H500V177H572V200.4H644V223.8H716V247.2H788V270.6H860V294H920" pathLength="1"/></mask>
  </defs>
  <path class="d-grid" d="M140 300H920"/>
  <text class="d-axis" x="124" y="304" style="text-anchor:end">0%</text>
  <path class="d-grid" d="M140 240H920"/>
  <text class="d-axis" x="124" y="244" style="text-anchor:end">20%</text>
  <path class="d-grid" d="M140 180H920"/>
  <text class="d-axis" x="124" y="184" style="text-anchor:end">40%</text>
  <path class="d-grid" d="M140 120H920"/>
  <text class="d-axis" x="124" y="124" style="text-anchor:end">60%</text>
  <path class="d-grid" d="M140 60H920"/>
  <text class="d-axis" x="124" y="64" style="text-anchor:end">80%</text>
  <text class="d-axis" x="140" y="328">0s</text>
  <text class="d-axis" x="212" y="328">1s</text>
  <text class="d-axis" x="284" y="328">2s</text>
  <text class="d-axis" x="356" y="328">3s</text>
  <text class="d-axis" x="428" y="328">4s</text>
  <text class="d-axis" x="500" y="328">5s</text>
  <text class="d-axis" x="572" y="328">6s</text>
  <text class="d-axis" x="644" y="328">7s</text>
  <text class="d-axis" x="716" y="328">8s</text>
  <text class="d-axis" x="788" y="328">9s</text>
  <text class="d-axis" x="860" y="328">10s</text>
  <path class="d-line d-curve" d="M140 60H212V83.4H284V106.8H356V130.2H428V153.6H500V177H572V200.4H644V223.8H716V247.2H788V270.6H860V294H920"/>
  <path class="d-hot d-curve" d="M140 60H212V83.4H284V106.8H356V130.2H428V153.6H500V177H572V200.4H644V223.8H716V247.2H788V270.6H860V294H920" mask="url(#as-m0)"/>
  <circle class="d-dot" cx="140" cy="60" r="5"/>
  <text class="d-title" x="154" y="46" style="text-anchor:start">80% at launch</text>
  <circle class="d-dot" cx="860" cy="294" r="5"/>
  <text class="d-title" x="874" y="284" style="text-anchor:start">2%, the coin's fee</text>
</svg>
</div>

The fee drops by an equal step each second: one tenth of the gap between 80% and the coin's fee.

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
