---
icon: lucide/user-round-plus
---

# Referrals

A referrer registers a code. A user binds to a referrer once, by that code. Every coin the user launches afterwards is attributed to the referrer, who earns a share of the protocol fee of that coin. See [Referrals](../guides/referrals.md) for how it looks for users.

## Functions

```solidity
function registerCode(string calldata code) external;
function useCode(string calldata code) external;
function claim() external returns (uint256 amount);
function distribute(address[] calldata referrers) external returns (uint256 total);
```

| Function | Description |
|----------|-------------|
| `registerCode(code)` | Registers a code for the caller. 1 to 32 characters of `a-z`, `0-9`, `_` and `-`, first come first served. A referrer can own several codes. |
| `useCode(code)` | Binds the caller to the owner of the code. Once per user, forever. Affects only the coins launched afterwards. |
| `claim()` | Pays the caller everything credited to them, in USDG. Reverts with `NothingToClaim` if there is nothing. |
| `distribute(referrers)` | Pays each listed referrer what is credited to them. Anyone can call it, funds only go to their owners. |

## Views

| Function | Returns |
|----------|---------|
| `codeOwner(code)` | Owner of a code, zero if free. Use it to check that a code is available. |
| `referrerOf(user)` | Referrer of a user, zero if none |
| `memeReferrer(coin)` | Referrer a coin is attributed to |
| `pendingOf(referrer)` | USDG credited and not paid yet |
| `earnedOf(referrer)` | USDG ever credited |
| `refShareBips()` | Share of the protocol fee credited to the referrer, in bips (2500 = 25%) |

## Example

```ts
// Referrer
await walletClient.writeContract({
  address: REFERRALS, abi: referralsAbi, functionName: "registerCode", args: ["mycode"],
});

// User: bind once, before launching a coin
await walletClient.writeContract({
  address: REFERRALS, abi: referralsAbi, functionName: "useCode", args: ["mycode"],
});

// Referrer: claim
await walletClient.writeContract({
  address: REFERRALS, abi: referralsAbi, functionName: "claim",
});
```

## Reverts

| Error | Cause |
|-------|-------|
| `InvalidCode` | Empty, longer than 32 characters or has a character outside `a-z0-9_-` |
| `CodeTaken(codeHash)` | The code is registered |
| `CodeNotFound(codeHash)` | The code doesn't exist |
| `ReferrerAlreadySet(user, referrer)` | The user is already bound |
| `SelfReferral` | The user used their own code |
| `NothingToClaim` | Nothing is credited |

## Events

`CodeRegistered`, `ReferrerSet`, `TokenRegistered`, `FeeReceived` and `ReferralPaid`. See [Events to index](events.md).
