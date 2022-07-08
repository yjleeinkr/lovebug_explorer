const express = require("express");
const router = express.Router();
const blockRouter = require("./blockRouter");
const txRouter = require("./txRouter");
const acctRouter = require("./acctRouter");

router.use("/block", blockRouter);
router.use("/transaction", txRouter);
router.use("/account", acctRouter);

module.exports = router;
