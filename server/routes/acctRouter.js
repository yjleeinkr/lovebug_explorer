const express = require("express");
const router = express.Router();
const db = require("../db/models/index");
const { Op } = require("sequelize");
const modifyTimestamp = require("../utils/modifyTime");
const Web3 = require("web3");

const web3 = new Web3(
  new Web3.providers.WebsocketProvider("ws://127.0.0.1:7979")
);

router.post("/getDetails/:acct", async (req, res) => {
  const { acct } = req.params;
  console.log(acct);
  try {
    const minedBlock = await db.Block.findAll({
      attributes: ["number", "hash"],
      order: [["number", "desc"]],
      where: {
        miner: acct.substring(1),
      },
    });

    let blockArr = [];
    minedBlock.forEach((v) => {
      let block = {
        number: v.number,
        hash: v.hash,
      };
      blockArr.push(block);
    });

    const doneTx = await db.Transaction.findAll({
      attributes: [
        "txHash",
        "value",
        "txFee",
        "timestamp",
        "blockNumber",
        "sender",
        "recipient",
      ],
      order: [["timestamp", "desc"]],
      where: {
        [Op.or]: [
          { sender: acct.substring(1) },
          { recipient: acct.substring(1) },
        ],
      },
    });
    let txArr = [];
    doneTx.forEach((v) => {
      let tx = {
        txHash: v.txHash,
        blockNumber: v.blockNumber,
        timestamp: modifyTimestamp(v.timestamp),
        from: v.sender,
        to: v.recipient,
        value: `${Number(v.value) / 10 ** 18} ETH`,
        txFee: v.txFee / 10 ** 18,
      };
      txArr.push(tx);
    });
    const balance = await web3.eth.getBalance(acct.substring(1));
    const balanceEth = await web3.utils.fromWei(balance, "ether");

    res.send({ blockArr, txArr, balanceEth });
  } catch (err) {
    res.status(400).send(err);
  }
});

module.exports = router;
