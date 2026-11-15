---
icon: lucide/landmark
---

# Earn Vault

One Earn Vault contract holds a logical vault for every coin. Holders deposit a coin in its vault and earn their share of the coin's trading fees, paid in the coin's reward assets.

The app and the guides say *deposit*. The contract calls the same action `stake`, so this page uses `stake` and `unstake` for function names.

## How fees reach the vault

1. After each swap the Hook sends the whole fee, in USDG, to the Vault with `notifyFees(coin, amount)`.
2. The Vault sends the protocol share (25%) to Referrals at once. The rest is credited in USDG right away: the creator share to the creator, the remainder pro rata to the current stakers. While nobody stakes, the creator receives the whole vault part.
3. When the vault's pending USDG reaches the conversion threshold ($5), it is swapped into the coin's reward assets by their weights.
4. Stakers and the creator claim the converted assets.

A staker earns only the fees that arrive while they are staked. Only converted rewards can be claimed.

## Stake and unstake

```solidity
function stake(address coin, uint256 amount) external;
function stakeWithPermit(address coin, uint256 amount, uint256 deadline, uint8 v, bytes32 r, bytes32 s) external;
function unstake(address coin, uint256 amount) external;
function exit(address coin) external;   // unstake everything and claim everything
```

`stake` pulls the coin from the caller, so approve the Vault first, or use `stakeWithPermit` with an EIP-2612 signature to skip the approval. `unstake` always works, even when the Vault is paused. Staking is not locked: you can leave at any time.

```ts
await walletClient.writeContract({
  address: COIN, abi: erc20Abi, functionName: "approve", args: [VAULT, amount],
});
await walletClient.writeContract({
  address: VAULT, abi: vaultAbi, functionName: "stake", args: [COIN, amount],
});
```

## Claim

```solidity
function claim(address coin) external;                          // every reward asset
function claim(address coin, address[] calldata assets) external; // only the listed assets
function claimCreatorRewards(address coin) external;            // pays the creator's share, callable by anyone
```

Use the second form to skip an asset whose transfer is broken. `claimCreatorRewards` can be called by anyone but always pays the current creator.

```ts
const [assets, amounts] = await publicClient.readContract({
  address: VAULT, abi: vaultAbi, functionName: "earned", args: [COIN, account],
});
await walletClient.writeContract({
  address: VAULT, abi: vaultAbi, functionName: "claim", args: [COIN],
});
```

## Conversion

```solidity
function convertFees(address coin) external returns (uint256[] memory amountsOut);
```

The Vault converts automatically at the end of a swap once the pending USDG reaches the threshold. Anyone can also call `convertFees` under the same condition. The swap runs through an adapter that checks the price against a Uniswap v3 TWAP, so no off-chain quote is needed. If an automatic conversion fails, the credited USDG stays pending, `ConversionFailed` is emitted and conversion is retried after a cooldown of 1 minute.

Every credit of an epoch is paid in the assets bought by that epoch's conversion, pro rata to its USDG amount.

## Creator

The creator share is fixed at launch (0% to 50%). The creator role can be handed over in two steps:

```solidity
function transferCreator(address coin, address newCreator) external; // current creator; zero address cancels
function acceptCreator(address coin) external;                       // the nominee; unclaimed rewards move with the role
```

## Views

| Function | Returns |
|----------|---------|
| `isRegistered(coin)` | Whether the coin has a vault |
| `getAssets(coin)` | Reward assets and weights (`AssetConfig[]`) |
| `vaultInfo(coin)` | Creator, `totalStaked`, pending USDG, creator share and more |
| `stakedOf(coin, account)` | Coins staked by the account |
| `totalStaked(coin)` | Coins staked in the vault |
| `earned(coin, account)` | Claimable rewards per asset |
| `pendingCreditOf(coin, account)` | USDG credited in the open epoch, not converted yet |
| `creatorOf(coin)`, `creatorShareBpsOf(coin)` | Creator and its share |
| `creatorAccrued(coin)` | Claimable creator rewards per asset |
| `pendingUSDG(coin)` | USDG waiting for conversion |
| `allowedAssets()` | The assets a new coin can choose as rewards |
| `protocolShareBps()`, `conversionThreshold()` | Current settings |

## Limits

| Constant | Value |
|----------|-------|
| `BPS` | 10,000 |
| `MAX_CREATOR_SHARE_BPS` | 5,000 (50%) |
| `MAX_ASSETS` | 8 reward assets per coin |
| `CONVERSION_COOLDOWN` | 1 minute |

## Events

| Event | Meaning |
|-------|---------|
| `VaultRegistered(meme, creator, creatorShareBps, assets)` | A coin's vault was created |
| `FeesNotified(meme, toStakers, toCreator)` | A fee was credited |
| `ProtocolFeePaid(meme, recipient, amount)` | The protocol part was paid |
| `FeesConverted(meme, epoch, usdgIn, toStakers, toCreator)` | An epoch was converted |
| `ConversionFailed(meme, reason)` | An automatic conversion failed and will be retried |
| `Staked`, `Unstaked(meme, account, amount)` | Deposit and withdrawal |
| `RewardPaid(meme, account, asset, amount)` | A staker claimed |
| `CreatorRewardPaid(meme, creator, asset, amount)` | The creator claimed |
| `CreatorTransferStarted`, `CreatorTransferred` | Creator handover |

## Reverts

| Error | Cause |
|-------|-------|
| `VaultNotRegistered(meme)` | The address is not a coin with a vault |
| `InsufficientStake(staked, requested)` | Unstaking more than staked |
| `ZeroAmount` | Zero amount |
| `AssetNotInVault(meme, asset)` | Claiming an asset the vault doesn't pay |
| `NothingToConvert`, `BelowConversionThreshold(pending, threshold)` | Manual conversion not possible yet |

`stake`, `claim`, `claimCreatorRewards` and `convertFees` revert while the Vault is paused. `unstake` and fee intake keep working.
