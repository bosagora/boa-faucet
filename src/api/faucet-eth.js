const config = require('@/config');
const { validateEthAddress } = require('@services/validator');
const wallet = require('@services/wallet');
const logger = require('@services/logger');

module.exports = {
  async request(req, res) {
    let { address } = req.params;

    if (!address || !validateEthAddress(address)) {
      return res
        .json({ error: 'Invalid BOA address', input: address })
        .status(400);
    }

    const addressBalance = await wallet.getBalanceOfAddress(address);

    if (Number(addressBalance) >= config.BOA_PAYOUT) {
      return res
        .json({
          error: 'You already have enough BOA!',
          balance: addressBalance,
          input: address
        })
        .status(400);
    }

    logger(`REQUESTED: ${config.BOA_PAYOUT} BOA from ${address}`);

    try {
      let { transactionHash } = await wallet.sendEther({
        to: address,
        amount: config.BOA_PAYOUT
      });

      let remainingBalance = await wallet.getBalance();

      logger(`SENT: ${config.BOA_PAYOUT} BOA to ${address}`);
      logger(`REMAINING: ${remainingBalance} BOA left in faucet`);
      return res.json({
        transactionHash,
        amount: config.BOA_PAYOUT
      });
    } catch (ex) {
      logger(`ERROR: ${ex.message}`);
      return res.json({ error: ex.message, input: address }).status(400);
    }
  },

  async getStatus(req, res) {
    let balance = await wallet.getBalance();
    return res.json({ balance, address: wallet.getAddress(), currency: 'BOA' });
  }
};
