const express = require("express");
const router = express.Router();
const db = require("../db/models/index");
const modifyTimestamp = require("../utils/modifyTime");

router.post("/getLatest", async (req, res) => {
  const blockInfo = await db.Block.findAll({
    attributes: ["number", "hash", "miner", "timestamp"],
    order: [["number", "desc"]],
    limit: 10,
  });

  let latestBlocks = [];
  blockInfo.forEach((v) => {
    const blockSum = {
      number: v.number,
      hash: v.hash,
      miner: v.miner,
      timestamp: modifyTimestamp(v.timestamp),
    };
    latestBlocks.push(blockSum);
  });

  res.send(latestBlocks);
});

router.post("/getList", async (req, res) => {
  const blockInfo = await db.Block.findAll({
    attributes: [
      "number",
      "hash",
      "timestamp",
      "miner",
      "gasUsed",
      "gasLimit",
      "transaction",
    ],
    order: [["number", "desc"]],
  });

  let blockInfos = [];
  blockInfo.forEach((v) => {
    let txn;
    if (v.transaction === null) {
      txn = 0;
    } else {
      let txArr = v.transaction.split(",");
      txn = txArr.length;
    }
    let blockDetail = {
      number: v.number,
      hash: v.hash,
      timestamp: modifyTimestamp(v.timestamp),
      txn,
      miner: v.miner,
      gasUsed: v.gasUsed,
      gasLimit: v.gasLimit,
    };

    blockInfos.push(blockDetail);
  });

  res.send(blockInfos);
});

router.post("/getDetails/:blockhash", async (req, res) => {
  const { blockhash } = req.params;
  try {
    const blockDetail = await db.Block.findOne({
      where: {
        hash: blockhash.substring(1),
      },
    });
    const {
      hash,
      number,
      miner,
      timestamp,
      difficulty,
      gasLimit,
      gasUsed,
      nonce,
      transaction,
    } = blockDetail;

    let pickedBlock = {
      hash,
      number,
      miner,
      timestamp: modifyTimestamp(timestamp),
      difficulty,
      gasLimit,
      gasUsed,
      nonce,
      transaction,
    };

    if (transaction === null) {
      pickedBlock = { ...pickedBlock, transaction: null };
    } else {
      pickedBlock = { ...pickedBlock, transaction: transaction.split(",") };
    }
    res.send(pickedBlock);
  } catch (err) {
    res.status(400).send(err);
  }
});

module.exports = router;
