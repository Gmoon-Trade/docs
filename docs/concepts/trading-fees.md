---
icon: lucide/percent
---

# Trading fees

Every coin has one trading fee. The creator sets it at launch, from 1% to 5% in steps of 0.1%, and it can't be changed later. The fee is charged in USDG on every buy and sell of the coin.

## How the fee is split

<div class="gm-diagram">
<!-- Icons: Lucide (lucide.dev), stroke 2 at 24px: arrow-left-right, landmark, users-round, user-round, user-round-plus -->
<svg xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 1000 430" role="img" aria-label="The trading fee splits into 75% for the Earn Vault and 25% for the protocol. The vault part goes to depositors and the creator; 25% of the protocol part goes to the creator's referrer.">
  <defs>
    <!-- Step 1: the fee splits into Earn Vault and Protocol at once. Step 2: the vault part splits between depositors
         and the creator while the protocol pays the referrer. -->
    <mask id="tf-m1a" maskUnits="userSpaceOnUse" x="0" y="0" width="1000" height="430"><path class="d-window d-step1" d="M122 225H200V130q0-10 10-10H368" pathLength="1"/></mask>
    <mask id="tf-m1b" maskUnits="userSpaceOnUse" x="0" y="0" width="1000" height="430"><path class="d-window d-step1" d="M122 225H200V320q0 10 10 10H368" pathLength="1"/></mask>
    <mask id="tf-m2a" maskUnits="userSpaceOnUse" x="0" y="0" width="1000" height="430"><path class="d-window d-step2" d="M432 120H600V70q0-10 10-10H728" pathLength="1"/></mask>
    <mask id="tf-m2b" maskUnits="userSpaceOnUse" x="0" y="0" width="1000" height="430"><path class="d-window d-step2" d="M432 120H600V180q0 10 10 10H728" pathLength="1"/></mask>
    <mask id="tf-m2c" maskUnits="userSpaceOnUse" x="0" y="0" width="1000" height="430"><path class="d-window d-step2" d="M432 330H728" pathLength="1"/></mask>
  </defs>

  <path class="d-line" d="M122 225H200V130q0-10 10-10H368"/>
  <path class="d-line" d="M122 225H200V320q0 10 10 10H368"/>
  <path class="d-line" d="M432 120H600V70q0-10 10-10H728"/>
  <path class="d-line" d="M432 120H600V180q0 10 10 10H728"/>
  <path class="d-line" d="M432 330H728"/>
  <path class="d-hot" d="M122 225H200V130q0-10 10-10H368" mask="url(#tf-m1a)"/>
  <path class="d-hot" d="M122 225H200V320q0 10 10 10H368" mask="url(#tf-m1b)"/>
  <path class="d-hot" d="M432 120H600V70q0-10 10-10H728" mask="url(#tf-m2a)"/>
  <path class="d-hot" d="M432 120H600V180q0 10 10 10H728" mask="url(#tf-m2b)"/>
  <path class="d-hot" d="M432 330H728" mask="url(#tf-m2c)"/>

  <!-- trade -->
  <circle class="d-node" cx="90" cy="225" r="32"/>
  <g class="d-icon" transform="translate(78 213)"><path d="M8 3 4 7l4 4M4 7h16M16 21l4-4-4-4M20 17H4"/></g>
  <text class="d-title" x="90" y="285">Buy or sell</text>
  <text class="d-sub" x="90" y="305">Trading fee, 1% to 5%</text>

  <!-- earn vault -->
  <circle class="d-node" cx="400" cy="120" r="32"/>
  <g class="d-icon" transform="translate(388 108)"><path d="M10 18v-7M14 18v-7M18 18v-7M3 22h18M6 18v-7"/><path d="M11.119 2.205a2 2 0 0 1 1.762 0l7.84 3.846A.5.5 0 0 1 20.5 7h-17a.5.5 0 0 1-.22-.949z"/></g>
  <text class="d-title" x="400" y="180">Earn Vault</text>
  <text class="d-sub" x="400" y="200">75% of the fee</text>

  <!-- protocol: GM mark from front src/pages/live-profile.tsx (ProfileGm) -->
  <circle class="d-node" cx="400" cy="330" r="32"/>
  <svg class="d-mark" x="384" y="325" width="32" height="10" viewBox="-65 0 439 137">
    <path d="M-37.5625 0L-65 27.4H99.625V0Z"/>
    <path d="M-37.5625 54.8L-65 27.4V109.6L-37.5625 137H72.1875L99.625 109.6V54.8H17.3125V82.2H72.1875V109.6H-37.5625Z"/>
    <path d="M264.25 27.4H346.563V137H374V27.4L346.563 0H291.688Z"/>
    <path d="M154.5 0H127.062V137H154.5Z"/>
    <path d="M209.375 0H181.938L154.5 27.4H236.813V137H264.25V0Z"/>
  </svg>
  <text class="d-title" x="400" y="390">Protocol</text>
  <text class="d-sub" x="400" y="410">25% of the fee</text>

  <!-- depositors -->
  <circle class="d-node" cx="760" cy="60" r="32"/>
  <g class="d-icon" transform="translate(748 48)"><circle cx="10" cy="8" r="5"/><path d="M18 21a8 8 0 0 0-16 0M22 20c0-3.37-2-6.5-4-8a5 5 0 0 0-.45-8.3"/></g>
  <text class="d-title" x="760" y="120">Depositors</text>
  <text class="d-sub" x="760" y="140">50% to 100% of the vault part</text>

  <!-- creator -->
  <circle class="d-node" cx="760" cy="190" r="32"/>
  <g class="d-icon" transform="translate(748 178)"><circle cx="12" cy="8" r="5"/><path d="M20 21a8 8 0 0 0-16 0"/></g>
  <text class="d-title" x="760" y="250">Creator</text>
  <text class="d-sub" x="760" y="270">0% to 50%, set at launch</text>

  <!-- referrer -->
  <circle class="d-node" cx="760" cy="330" r="32"/>
  <g class="d-icon" transform="translate(748 318)"><path d="M2 21a8 8 0 0 1 13.292-6M19 16v6M22 19h-6"/><circle cx="10" cy="8" r="5"/></g>
  <text class="d-title" x="760" y="390">Creator's referrer</text>
  <text class="d-sub" x="760" y="410">25% of the protocol part</text>
</svg>
</div>

1. **Earn Vault, 75% of the fee.** The creator share, set at launch from 0% to 50%, goes to the creator. The rest goes to the holders who deposited the coin in its Earn Vault. While nothing is deposited, the creator receives the whole vault part.
2. **Protocol, 25% of the fee.** If the coin's creator joined Gmoon with someone's referral code, 25% of the protocol part goes to that referrer. This is 6.25% of each fee on the coin.

## Example

A $1,000 buy of a coin with a 2% fee and a 20% creator share, whose creator has a referrer:

| Recipient | Share of the fee | Amount |
|-----------|------------------|--------|
| Depositors | 60% | $12.00 |
| Creator | 15% | $3.00 |
| Creator's referrer | 6.25% | $1.25 |
| Protocol | 18.75% | $3.75 |
| **Total fee** | **100%** | **$20.00** |

## Launch fee

For the first 10 seconds after launch a higher fee applies: it starts at 80% and falls to the fee set by the creator. See [Anti-sniper fee](anti-sniper-fee.md).
