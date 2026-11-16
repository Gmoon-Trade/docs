---
icon: lucide/eye
---

# Reading state

The Lens contract returns what a token page, a table row or a profile shows in one to three `eth_call`s. Use it instead of reading each field from each contract.

Every Lens function is `view`. A failing read never reverts the batch: it leaves zeros and, where zero is a valid value, a false `ok` flag. Show "no data" for it. Results come in the order of the input.

## Functions

```solidity
function tokens(address[] calldata coins, address account) external view returns (TokenView[] memory);
function markets(address[] calldata coins) external view returns (TokenMarket[] memory market, uint256[] memory staked);
function totalStaked(address[] calldata coins) external view returns (uint256[] memory);
function quotes(address[] calldata assets, uint256 amountIn) external view returns (uint256[] memory amounts, bool[] memory ok);
function protocol() external view returns (address usdg, uint8 usdgDecimals, string memory usdgSymbol, address swapAdapter, uint256 conversionThreshold, uint256 conversionCooldown, address hook, address poolManager);
function creator(address coin) external view returns (address creatorOf, address[] memory assets, uint256[] memory accrued);
function creators(address[] calldata coins) external view returns (CreatorRewards[] memory);
```

| Function | Use it for |
|----------|-----------|
| `tokens(coins, account)` | Everything about a coin: metadata, market, vault and the account's position. Pass `address(0)` as the account to skip account reads. |
| `markets(coins)` | Light refresh of prices and deposited totals, without strings |
| `quotes(assets, amountIn)` | How much of each reward asset `amountIn` USDG buys right now |
| `protocol()` | USDG, swap adapter, conversion threshold, hook and PoolManager in one call |
| `creator(coin)`, `creators(coins)` | The creator and the creator rewards claimable now |

## What `tokens` returns

For each coin, a `TokenView`:

| Field | Content |
|-------|---------|
| `meta` | `name`, `symbol`, `decimals`, `description`, `image`, `creator` and social links |
| `market` | `totalSupply`, `burned`, `poolId`, `sqrtPriceX96`, `memeIsToken0`, `pendingFees` |
| `vault` | `registered`, `totalStaked`, `creator`, `creatorShareBps`, pending USDG, `assets` with weights, symbols and decimals |
| `position` | The account's `balance`, `staked`, `pendingCredit`, `allowance` to the Vault and `earnedAssets` with `earnedAmounts` |

## Price from `sqrtPriceX96`

`sqrtPriceX96` is the square root of the pool price in Q64.96 fixed point. `memeIsToken0` tells you which token the price is quoted in:

```ts
const Q96 = 2n ** 96n;
// token1 per token0, as a float, from raw units
const p = Number(sqrtPriceX96) ** 2 / Number(Q96) ** 2;
// scale to whole tokens: multiply by 10^(decimals0 - decimals1)
const token1PerToken0 = p * 10 ** (decimals0 - decimals1);
// USDG per coin: token1PerToken0 if the coin is token0, otherwise 1 / token1PerToken0
const usdgPerCoin = memeIsToken0 ? token1PerToken0 : 1 / token1PerToken0;
```

Scale by the decimals of both tokens (coin 18, USDG from `protocol().usdgDecimals`). Market cap = price × `totalSupply`.

## Example

```ts
const [view] = await publicClient.readContract({
  address: LENS, abi: lensAbi, functionName: "tokens",
  args: [[coin], account],
});

view.meta.name;
view.vault.totalStaked;
view.position.earnedAmounts;
```

## Reading without the Lens

| What | Call |
|------|------|
| All coins | Index `TokenCreated` of the Controller (see [Events](events.md)) |
| Hook of a coin | `Controller.hookOf(coin)` |
| Current fee of a coin | `Hook.currentFeeBips(coin)` |
| Fee split of a coin | `coin.feeInfo()` |
| Holders count | `coin.totalHolders()` |
| Reward assets you can pick | `Vault.allowedAssets()` |
| Referrer of a user | `Referrals.referrerOf(user)` |
| Claimable referral rewards | `Referrals.pendingOf(referrer)` |
