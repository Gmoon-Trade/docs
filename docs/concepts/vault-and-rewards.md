---
icon: lucide/coins
---

# Vault and rewards

Every coin has its own Earn Vault. The vault receives 75% of the coin's trading fees in USDG. It converts them into the reward assets the creator picked at launch and pays them to the creator and to holders who deposit the coin.

At launch the creator sets:

| Setting | Range | Changes later? |
|---------|-------|----------------|
| Reward assets | 1 to 8 of 64 assets | No |
| Asset weights | From 0.01% to 100% each, 100% in total | No |

Gmoon shows the vault's yield per day:

```
Yield per day = depositors' rewards over the last 24 hours / (coins deposited × fair price) × 100%
```

Depositors' rewards are valued at the assets' current prices. The creator's share is not included. Fair price is the coin's volume-weighted average price (VWAP) over the last 24 hours:

```
Fair price = USDG traded in the coin's pool over 24 hours / coins traded over 24 hours
```

## Epochs and conversion

The vault collects fees in epochs. The first epoch starts at launch, and each next one starts after the previous conversion. During an epoch, fees stay in the vault in USDG.

When an epoch's fees reach $5, the vault converts them into the reward assets by the weights the creator set at launch and starts a new epoch. The trade that brings the fees to $5 triggers the conversion.

The vault splits the fees between the assets by their weights. For example, a $5 conversion with NVDA 50%, TSLA 30% and SPY 20%:

<div class="gm-diagram" style="--w:579.6px">
<svg xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="138.3 48.2 772.8 343.5" style="--gm-cycle:3.35s;--gm-run:gm-run-335" role="img" aria-label="A $5 conversion with weights NVDA 50%, TSLA 30% and SPY 20% buys $2.50 of NVDA, $1.50 of TSLA and $1.00 of SPY.">
  <defs>
    <!-- The trunk runs first; the three branches start when its head reaches the fork, so the line never breaks. -->
    <mask id="as-m0" maskUnits="userSpaceOnUse" x="0" y="0" width="1000" height="440"><path class="d-window" d="M232 220H460" pathLength="1" style="animation-delay:0s"/></mask>
    <mask id="as-m1" maskUnits="userSpaceOnUse" x="0" y="0" width="1000" height="440"><path class="d-window" d="M460 220V90q0-10 10-10H668" pathLength="1" style="animation-delay:1s"/></mask>
    <mask id="as-m2" maskUnits="userSpaceOnUse" x="0" y="0" width="1000" height="440"><path class="d-window" d="M460 220H668" pathLength="1" style="animation-delay:1s"/></mask>
    <mask id="as-m3" maskUnits="userSpaceOnUse" x="0" y="0" width="1000" height="440"><path class="d-window" d="M460 220V350q0 10 10 10H668" pathLength="1" style="animation-delay:1s"/></mask>
  </defs>
  <path class="d-line" d="M232 220H460"/>
  <path class="d-line" d="M460 220V90q0-10 10-10H668"/>
  <path class="d-line" d="M460 220H668"/>
  <path class="d-line" d="M460 220V350q0 10 10 10H668"/>
  <path class="d-hot" d="M232 220H460" mask="url(#as-m0)"/>
  <path class="d-hot" d="M460 220V90q0-10 10-10H668" mask="url(#as-m1)"/>
  <path class="d-hot" d="M460 220H668" mask="url(#as-m2)"/>
  <path class="d-hot" d="M460 220V350q0 10 10 10H668" mask="url(#as-m3)"/>

  <image xlink:href="../../assets/reward-icons/USDG.svg" x="168" y="188" width="64" height="64" clip-path="url(#gm-round)"/>
  <circle class="d-logo-ring" cx="200" cy="220" r="32"/>
  <text class="d-title" x="200" y="282">Collected fees</text>
  <text class="d-sub" x="200" y="306">$5 USDG</text>
  <image xlink:href="../../assets/reward-icons/NVDA.svg" x="668" y="48" width="64" height="64" clip-path="url(#gm-round)"/>
  <circle class="d-logo-ring" cx="700" cy="80" r="32"/>
  <text class="d-title" x="748" y="74" style="text-anchor:start">NVDA, weight 50%</text>
  <text class="d-sub" x="748" y="98" style="text-anchor:start">$2.50</text>
  <image xlink:href="../../assets/reward-icons/TSLA.svg" x="668" y="188" width="64" height="64" clip-path="url(#gm-round)"/>
  <circle class="d-logo-ring" cx="700" cy="220" r="32"/>
  <text class="d-title" x="748" y="214" style="text-anchor:start">TSLA, weight 30%</text>
  <text class="d-sub" x="748" y="238" style="text-anchor:start">$1.50</text>
  <image xlink:href="../../assets/reward-icons/SPY.svg" x="668" y="328" width="64" height="64" clip-path="url(#gm-round)"/>
  <circle class="d-logo-ring" cx="700" cy="360" r="32"/>
  <text class="d-title" x="748" y="354" style="text-anchor:start">SPY, weight 20%</text>
  <text class="d-sub" x="748" y="378" style="text-anchor:start">$1.00</text>
</svg>
</div>

The vault buys each asset in its Uniswap v3 pool and checks the asset's current price against its time-weighted average price (TWAP) over the last 10 minutes. Support for Uniswap v4 pools will be added later. If any asset costs more than 1% above its TWAP, the vault skips the conversion. In that case:

- The trade that triggered the conversion goes through as usual.
- The epoch doesn't end. Its fees stay in USDG, and fees from the next trades are added to the same epoch.
- The vault waits 60 seconds, then tries again with the next trade.

## Reward distribution

Depositors split the vault's fees by their vault share, after the creator share. A vault share is a holder's deposit divided by all coins deposited in the vault at the moment each fee arrives. During an epoch, each depositor's rewards are counted in USDG. When the epoch ends, the vault converts the USDG, and each depositor gets the assets bought with their part.

Example coin:

- Creator share: 10%
- Holder A: 500K coins deposited
- Holder B: 300K coins deposited
- Holder C: 200K coins deposited
- Fees collected in the epoch: $5

<div class="gm-diagram" style="--w:711px">
<svg xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="23.3 44.0 950.0 394.0" style="--gm-cycle:6.7s;--gm-run:gm-run-67" role="img" aria-label="$5 of fees in the Earn Vault is converted into the reward assets: $0.50 to the creator, then $2.25, $1.35 and $0.90 to holders who deposited 500K, 300K and 200K coins.">
  <defs>
    <clipPath id="gm-round" clipPathUnits="objectBoundingBox"><circle cx=".5" cy=".5" r=".5"/></clipPath>
    <!-- Stage 1: fees reach the vault. Stage 2: the vault converts them. Stage 3: from the conversion to the fork, then to every recipient as the fork is reached. -->
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
  <text class="d-sub" x="500" y="292">Converted every $5</text>
  <circle class="d-node" cx="660" cy="75" r="32"/>
  <g class="d-icon" transform="translate(648 63)"><circle cx="12" cy="8" r="5"/><path d="M20 21a8 8 0 0 0-16 0"/></g>
  <text class="d-title" x="708" y="69" style="text-anchor:start">Creator</text>
  <text class="d-sub" x="708" y="93" style="text-anchor:start">10% share, $0.50</text>
  <circle class="d-node" cx="660" cy="185" r="32"/>
  <g class="d-icon" transform="translate(648 173)"><circle cx="12" cy="8" r="5"/><path d="M20 21a8 8 0 0 0-16 0"/></g>
  <text class="d-title" x="708" y="179" style="text-anchor:start">Holder A</text>
  <text class="d-sub" x="708" y="203" style="text-anchor:start">500K coins, 50% of the rest, $2.25</text>
  <circle class="d-node" cx="660" cy="295" r="32"/>
  <g class="d-icon" transform="translate(648 283)"><circle cx="12" cy="8" r="5"/><path d="M20 21a8 8 0 0 0-16 0"/></g>
  <text class="d-title" x="708" y="289" style="text-anchor:start">Holder B</text>
  <text class="d-sub" x="708" y="313" style="text-anchor:start">300K coins, 30% of the rest, $1.35</text>
  <circle class="d-node" cx="660" cy="405" r="32"/>
  <g class="d-icon" transform="translate(648 393)"><circle cx="12" cy="8" r="5"/><path d="M20 21a8 8 0 0 0-16 0"/></g>
  <text class="d-title" x="708" y="399" style="text-anchor:start">Holder C</text>
  <text class="d-sub" x="708" y="423" style="text-anchor:start">200K coins, 20% of the rest, $0.90</text>
</svg>
</div>

A depositor who withdraws before the epoch ends doesn't lose the rewards earned in it. Their USDG part of that epoch becomes claimable in assets after the epoch is converted, even though their coins are no longer in the vault.

## Deposit

Any holder can deposit the coin in its vault and add to the deposit later. There is no minimum amount and no lock period. The vault counts the holder's vault share from the moment of the deposit, so a deposit earns only from fees that arrive after it.

## Withdraw

A depositor can withdraw all or part of their coins at any time. They can withdraw only the coins, or withdraw the coins and claim the rewards in the same transaction. A withdrawal reduces the depositor's vault share. Rewards earned before the withdrawal are still claimable, but withdrawn coins earn nothing from later fees.

## Claim rewards

A depositor can claim rewards at any time, even after withdrawing all their coins. Rewards become claimable when the epoch they were earned in ends and the vault converts it. Unclaimed rewards stay in the vault and don't expire.

## Creator rewards

The creator gets their creator share of the vault's fees, from 0% to 50%. While nothing is deposited in the vault, the creator gets 100% of the vault's part. The creator's share is converted in the same epoch as the depositors' share.

The creator can claim their rewards at any time after the conversion. Unclaimed creator rewards stay in the vault and don't expire.
