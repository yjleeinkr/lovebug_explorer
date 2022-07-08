const express = require("express");
const router = express.Router();
const db = require("../db/models/index");
const modifyTimestamp = require("../utils/modifyTime");

router.post("/getLatest", async (req, res) => {
  const txInfo = await db.Transaction.findAll({
    attributes: ["txHash", "sender", "recipient", "timestamp"],
    order: [["timestamp", "desc"]],
    limit: 10,
  });
  res.send(txInfo);
});

router.post("/getList", async (req, res) => {
  const txList = await db.Transaction.findAll({
    attributes: [
      "txHash",
      "blockNumber",
      "timestamp",
      "sender",
      "recipient",
      "value",
      "txFee",
    ],
    order: [["timestamp", "desc"]],
  });

  let txInfos = [];
  txList.forEach((v) => {
    let txDetail = {
      txHash: v.txHash,
      blockNumber: v.blockNumber,
      timestamp: modifyTimestamp(v.timestamp),
      from: v.sender,
      to: v.recipient,
      value: `${Number(v.value) / 10 ** 18} ETH`,
      txFee: v.txFee / 10 ** 18,
    };
    txInfos.push(txDetail);
  });
  res.send(txInfos);
});

router.post("/getDetails/:txhash", async (req, res) => {
  const { txhash } = req.params;
  try {
    const txDetail = await db.Transaction.findOne({
      where: {
        txHash: txhash.substring(1),
      },
    });
    const {
      txHash,
      sender,
      recipient,
      value,
      txFee,
      gasLimit,
      gasPrice,
      gasUsed,
      blockNumber,
      timestamp,
    } = txDetail;

    const blockHash = await db.Block.findOne({
      attributes: ["hash"],
      where: {
        number: blockNumber,
      },
    });

    const { hash } = blockHash;

    let pickedTx = {
      txHash,
      sender,
      recipient,
      value: `${Number(value) / 10 ** 18} ETH`,
      txFee: `${txFee / 10 ** 18} ETH`,
      gasLimit,
      gasPrice: `${gasPrice / 10 ** 9} Gwei`,
      blockNumber,
      timestamp: modifyTimestamp(timestamp),
      blockHash: hash,
    };
    res.send(pickedTx);
  } catch (err) {
    res.status(400).send({ err });
  }
});

module.exports = router;
