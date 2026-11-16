---
icon: lucide/file-code
---

# Contracts

Gmoon is a set of single-purpose contracts on Robinhood Chain (chain ID 4663). Every coin is its own ERC-20 with its own Uniswap v4 pool, and all coins share one Controller, one Hook, and one Earn Vault.

| Contract | Role |
|----------|------|
| **Controller** | Launches a coin in one transaction: deploys the token, registers its vault, creates the pool, mints the starting liquidity and makes the optional creator buy. Also the factory you index for new coins. |
| **Coin** | The ERC-20 of one coin: 1B supply, 18 decimals, on-chain metadata (ERC-1046) and the fee split it was launched with. Each coin is its own contract. |
| **Hook** | Uniswap v4 hook of the coin pools. Charges the trading fee and the anti-sniper fee in USDG and pays it to the Earn Vault after every swap. |
| **Earn Vault** | Holds the deposits of every coin, splits fees between protocol, creator and depositors, swaps them into reward assets and pays rewards out. |
| **Lens** | Read-only batch reader. One call returns what a token page or a table row shows. |

## Deployed addresses

Robinhood Chain, chain ID 4663. Block explorer: [robin.etherscan.io](https://robin.etherscan.io).

| Contract | Address |
|----------|---------|
| Controller | [`0x1d05Da4495E57C764229Ec355FCEC1298C6A4AeD`](https://robin.etherscan.io/address/0x1d05Da4495E57C764229Ec355FCEC1298C6A4AeD) |
| Hook | [`0x151b62aFEB631205900559239C8aa1Bf8451f0CC`](https://robin.etherscan.io/address/0x151b62aFEB631205900559239C8aa1Bf8451f0CC) |
| Earn Vault | [`0x1fd8082AC782444EcD013803A18BAD383BFAc0F8`](https://robin.etherscan.io/address/0x1fd8082AC782444EcD013803A18BAD383BFAc0F8) |
| Lens | [`0xfc6B4d970101E699336B3879A77c5144033a136D`](https://robin.etherscan.io/address/0xfc6B4d970101E699336B3879A77c5144033a136D) |

### Tokens and infrastructure

The contracts above work with these. They are not part of Gmoon.

| Contract | Address |
|----------|---------|
| USDG, the pair token of every coin | [`0x5fc5360D0400a0Fd4f2af552ADD042D716F1d168`](https://robin.etherscan.io/address/0x5fc5360D0400a0Fd4f2af552ADD042D716F1d168) |
| WETH | [`0x0Bd7D308f8E1639FAb988df18A8011f41EAcAD73`](https://robin.etherscan.io/address/0x0Bd7D308f8E1639FAb988df18A8011f41EAcAD73) |
| Uniswap v4 PoolManager | [`0x8366a39CC670B4001A1121B8F6A443A643e40951`](https://robin.etherscan.io/address/0x8366a39CC670B4001A1121B8F6A443A643e40951) |
| Uniswap v4 Quoter | [`0x8Dc178eFB8111BB0973Dd9d722ebeFF267c98F94`](https://robin.etherscan.io/address/0x8Dc178eFB8111BB0973Dd9d722ebeFF267c98F94) |
| Uniswap Universal Router 2.1.2 | [`0x204FAca1764B154221e35c0d20aBb3c525710498`](https://robin.etherscan.io/address/0x204FAca1764B154221e35c0d20aBb3c525710498) |
| Permit2 | [`0x000000000022D473030F116dDEE9F6B43aC78BA3`](https://robin.etherscan.io/address/0x000000000022D473030F116dDEE9F6B43aC78BA3) |

!!! warning "Look up coins and hooks instead of hardcoding them"
    Read the address of each coin from the `TokenCreated` event, and the hook of its pool from `Controller.hookOf(coin)`. The Controller's `hook()` is only the hook for coins launched from now on, so it can differ from the hook of an older coin's pool.

## Interfaces

The function and event signatures in this section come from the interfaces `IGemoonController`, `IGemoonToken`, `IHookManager`, `IVault` and `IGemoonLens`.

## Where to go next

| I want to | Page |
|-----------|------|
| Launch a coin from code | [Launching a coin](launching-a-coin.md) |
| Buy or sell a coin | [Buying and selling](buying-and-selling.md) |
| Deposit coins and claim rewards | [Earn Vault](earn-vault.md) |
| Read coins, prices, balances, rewards | [Reading state](reading-state.md) |
| Index the protocol | [Events to index](events.md) |
