---
icon: lucide/file-code
---

# Example article

This is an example article. Copy the file, rename it and add it to `nav` in `mkdocs.yml`.
{ .gm-lead }

## Text and links

A regular paragraph with **emphasis**, `inline code` and a [link to the home page](../index.md).

- First item
- Second item
- Third item

## Code block

```solidity
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

contract Example {
    uint256 public value;

    function set(uint256 v) external {
        value = v;
    }
}
```

## Numbered flow

<div class="gm-flow" markdown>

1. **Create**

    The token is minted with a fixed supply and its pool goes live in the same transaction.

2. **Trade**

    Buys and sells run against the locked pool and move the price.

3. **Graduate**

    Once enough liquidity is paired, trading continues in the same pool.

</div>

## Definitions

<dl class="gm-defs">
  <div><dt>Price</dt><dd>The current pool price for one token.</dd></div>
  <div><dt>Market cap</dt><dd>Price multiplied by circulating supply.</dd></div>
  <div><dt>Slippage</dt><dd>The maximum execution movement a transaction accepts.</dd></div>
  <div><dt>Liquidity</dt><dd>Assets available in the pool around the current price.</dd></div>
</dl>

## Table

| Parameter | Value | Description |
|-----------|-------|-------------|
| `chainId` | 1 | Network identifier |
| `fee` | 0.3% | Protocol fee |
| `status` | <span class="gm-pos">Active</span> | Pool status |

## Callouts

!!! note "Note"
    A regular informational callout.

!!! warning "Warning"
    An important warning for the reader.

??? tip "Collapsible block"
    The content expands on click.

## Tabs

=== "Holdings"

    | Coin | Price | Balance |
    |------|-------|---------|
    | Ether | $2,324.62 | 0.0011 |
    | Global Dollar | $1.00 | 2.15 |

=== "Vaults"

    Empty.
