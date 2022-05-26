# BOA Faucet

A faucet API for BOSAGORA TestNet.

## Installation

1. Clone the repo
2. Edit the configuration
3. Send some ether to the wallet specified in config
4. `npm start`

## Configuration

To tell the faucet how to work, do this:

```sh
cp .env.example .env
vi .env
```

Then just change the parameters in the `.env` file.

### BOA_PRIVATE_KEY

Paste your private key here.
This wallet will be used to drip BOA.

**Important** you must remove the `0x` from the start of the key.

### BOA_PAYOUT

Defines how much BOA you'll give per request.

### BOA_NODE_URL

Url of the BOSAGORA node you'll be connecting to. Here are some examples:

- `https://testnet.bosagora.org` - BOSAGORA TestNet over HTTP

## How it works

The faucet generates and signs raw transactions,
then sending them to the blockchain.

## How to get a BOA

GET `https://faucet.bosagora.org/request/boa/` + Your's BOA Address

## Licence
MIT
