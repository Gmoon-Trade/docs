---
icon: lucide/activity
---

# Events to index

Everything about the protocol can be rebuilt from events. Index the Controller from its deployment block and you get every coin, then the Hook, the Vault and Referrals for trades, deposits and rewards. This gives a source of truth that does not depend on any Gmoon service.

## What to index

| Goal | Contract | Event |
|------|----------|-------|
| Every coin launched | Controller | `TokenCreated(tokenAddress, creatorAdmin, positionId, creatorRewardRecipient, name, symbol)` |
| Pool and start price | Controller | `PoolCreated(pool, token0, token1, initialPrice, tick)` |
| Creator's first buy | Controller | `DevBuy(token, buyer, pairIn, memeOut)` |
| Reward assets and creator share | Vault | `VaultRegistered(meme, creator, creatorShareBps, assets)` |
| Every trade | Hook | `MemeSwapped(meme, router, trader, isBuy, pairAmount, memeAmount, fee)` |
| Fee of a coin | Hook | `MemeFeeConfigured(meme, feeBips, createdAt)` |
| Deposits and withdrawals | Vault | `Staked`, `Unstaked(meme, account, amount)` |
| Rewards claimed | Vault | `RewardPaid(meme, account, asset, amount)`, `CreatorRewardPaid(meme, creator, asset, amount)` |
| Fees converted to rewards | Vault | `FeesConverted(meme, epoch, usdgIn, toStakers, toCreator)` |
| Fees credited | Vault | `FeesNotified(meme, toStakers, toCreator)` |
| Creator handover | Vault | `CreatorTransferStarted`, `CreatorTransferred` |
| Referral codes | Referrals | `CodeRegistered(referrer, codeHash, code)` |
| Referral links | Referrals | `ReferrerSet(user, referrer, codeHash)`, `TokenRegistered(meme, creator, referrer)` |
| Referral rewards | Referrals | `FeeReceived(meme, referrer, amount, refAmount)`, `ReferralPaid(referrer, amount)` |
| Coin metadata changes | Coin | `UpdateImage`, `UpdateDescription`, `UpdateTokenURI` |

## Details that matter when indexing

- **Trades.** `MemeSwapped` is the one event you need for trades and volume. `pairAmount` is the USDG side without the fee. A buyer pays `pairAmount + fee` and a seller receives `pairAmount - fee`. `trader` is self-reported by the swapper: use it for display, not for authorization.
- **Volume in USDG.** Sum `pairAmount`. The fee income is the sum of `fee`.
- **Coin events.** Take the coin addresses from `TokenCreated`, then index the coins' own events (`Transfer`, `UpdateImage`) for that list.
- **Hook of a coin.** Pools of older coins keep paying through their own hook. Resolve it with `Controller.hookOf(coin)` and index `MemeSwapped` of every hook ever used.
- **Reorgs.** Wait for the confirmations your application needs before treating an event as final.
- **RPC limits.** Many providers cap `eth_getLogs` ranges (for example 500 blocks). Page the historic sync.

## Example

```ts
const logs = await publicClient.getLogs({
  address: HOOK,
  event: parseAbiItem(
    "event MemeSwapped(address indexed meme, address indexed router, address indexed trader, bool isBuy, uint256 pairAmount, uint256 memeAmount, uint256 fee)"
  ),
  fromBlock, toBlock,
});
```

## Start blocks

Start each contract at the block it was deployed in. Nothing earlier exists for it.

| Contract | Start block |
|----------|-------------|
| Earn Vault | 104517469 |
| Controller | 104517510 |
| Referrals | 104517526 |
| Hook | 104517532 |
| Lens | 104518881 |
