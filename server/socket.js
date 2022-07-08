const db = require("./db/models/index");

module.exports = async (wsServer, web3) => {
  // For db-block,tx syncing
  let txInBlock = [];
  const newBlocks = [];
  const blockQty = await web3.eth.getBlockNumber();
  const savedBlockQty = await db.Block.findAll();

  if (savedBlockQty.length < blockQty) {
    for (let i = savedBlockQty.length + 1; i <= blockQty; i++) {
      const block = await web3.eth.getBlock(i, true);
      newBlocks.push(block);
      if (block.transactions.length > 0) {
        for (let j = 0; j < block.transactions.length; j++) {
          txInBlock.push(block.transactions[j]);
        }
      }
    }
    newBlocks.forEach(async (_block) => {
      const {
        hash,
        number,
        miner,
        timestamp,
        difficulty,
        gasLimit,
        gasUsed,
        nonce,
        transactions,
      } = _block;

      let blockForDb = {
        hash,
        number,
        miner,
        timestamp: timestamp * 1000,
        difficulty,
        gasLimit,
        gasUsed,
        nonce,
        transactions,
      };

      let blockTxForDb;
      if (blockForDb.gasUsed > 0) {
        let txArr = [];
        blockForDb.transactions.forEach((_tx) => {
          txArr.push(_tx.hash);
        });
        blockTxForDb = txArr.join();
        blockForDb = { ...blockForDb, transaction: blockTxForDb };
      } else {
        blockTxForDb = null;
        blockForDb = { ...blockForDb, transaction: blockTxForDb };
      }
      db.Block.create(blockForDb);
    });

    txInBlock.forEach(async (_tx) => {
      const receipt = await web3.eth.getTransactionReceipt(_tx.hash);
      const block = await web3.eth.getBlock(_tx.blockNumber, true);
      const { gasUsed } = receipt;
      const { hash, from, to, value, gas, gasPrice, blockNumber } = _tx;
      const txForRecord = {
        txHash: hash,
        sender: from,
        recipient: to,
        value: value.toString(),
        txFee: gasPrice * gasUsed,
        gasLimit: gas,
        gasPrice: parseInt(gasPrice),
        gasUsed,
        blockNumber,
        timestamp: block.timestamp * 1000,
      };
      db.Transaction.create(txForRecord);
    });
  }
  // once catching newly added block, update block,tx on DB
  await web3.eth.subscribe("newBlockHeaders", async (err, res) => {
    if (!err) {
      const { hash } = res;
      const block = await web3.eth.getBlock(hash);
      const {
        number,
        miner,
        timestamp,
        difficulty,
        gasLimit,
        gasUsed,
        nonce,
        transactions,
      } = block;

      let minedBlock = {
        hash,
        number,
        miner,
        timestamp: timestamp * 1000,
        difficulty,
        gasLimit,
        gasUsed,
        nonce,
        transactions,
      };

      if (minedBlock.gasUsed > 0) {
        let blockTxForDb = minedBlock.transactions.join();
        minedBlock = { ...minedBlock, transaction: blockTxForDb };
      } else {
        blockTxForDb = null;
        minedBlock = { ...minedBlock, transaction: blockTxForDb };
      }
      await db.Block.create(minedBlock);

      if (transactions.length > 0) {
        transactions.forEach(async (_txhash) => {
          const txReceipt = await web3.eth.getTransactionReceipt(_txhash);
          const tx = await web3.eth.getTransaction(_txhash);
          const { from, to, gasUsed, blockNumber } = txReceipt;
          const { gasPrice, value, gas } = tx;
          let minedTx = {
            txHash: _txhash,
            sender: from,
            recipient: to,
            value: value.toString(),
            txFee: gasPrice * gasUsed,
            gasLimit: gas,
            gasPrice: parseInt(gasPrice),
            gasUsed,
            blockNumber,
            timestamp: block.timestamp * 1000,
          };
          await db.Transaction.create(minedTx);
        });
      }
    }
  });

  // once catching newly added block, update block,tx on front
  wsServer.on("connection", async (socket) => {
    console.log("socket open 🚀 ");
    await web3.eth
      .subscribe("newBlockHeaders", async (err, res) => {
        if (!err) {
          const { hash } = res;
          const block = await web3.eth.getBlock(hash);
          const {
            number,
            miner,
            timestamp,
            difficulty,
            gasLimit,
            gasUsed,
            nonce,
            transactions,
          } = block;

          let minedBlock = {
            hash,
            number,
            miner,
            timestamp: timestamp * 1000,
            difficulty,
            gasLimit,
            gasUsed,
            nonce,
            transactions,
          };

          if (minedBlock.gasUsed > 0) {
            let blockTxForDb = minedBlock.transactions.join();
            minedBlock = { ...minedBlock, transaction: blockTxForDb };
          } else {
            blockTxForDb = null;
            minedBlock = { ...minedBlock, transaction: blockTxForDb };
          }
          socket.emit("get_minedBlock", { minedBlock });

          if (transactions.length > 0) {
            transactions.forEach(async (_txhash) => {
              const txReceipt = await web3.eth.getTransactionReceipt(_txhash);
              const tx = await web3.eth.getTransaction(_txhash);
              const { from, to, gasUsed, blockNumber } = txReceipt;
              const { gasPrice, value, gas } = tx;
              let minedTx = {
                txHash: _txhash,
                sender: from,
                recipient: to,
                value: value.toString(),
                txFee: gasPrice * gasUsed,
                gasLimit: gas,
                gasPrice: parseInt(gasPrice),
                gasUsed,
                blockNumber,
                timestamp: block.timestamp * 1000,
              };
              socket.emit("get_minedTx", { minedTx });
            });
          }
        }
      })
      .on("error", console.error);

    socket.on("disconnect", () => {
      console.log("소켓 닫아");
    });
  });
};
