const express = require("express");
const app = express();
const { sequelize } = require("./db/models");
const http = require("http");
const cors = require("cors");
const SocketIo = require("socket.io");
const Web3 = require("web3");
const web3 = new Web3(
  new Web3.providers.WebsocketProvider("ws://127.0.0.1:7979")
);
const router = require("./routes/index");

const httpServer = http.createServer(app);
const wsServer = SocketIo(httpServer, {
  cors: {
    origin: "http://localhost:3000",
    credentials: true,
  },
});
require("./socket")(wsServer, web3);

app.use(
  cors({
    origin: ["http://localhost:3000"],
    credentials: true,
  })
);

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use("/api", router);

httpServer.listen(4000, async () => {
  try {
    await sequelize.sync({ alter: true });
    console.log("server is running");
    console.log("DB sync!");
  } catch (err) {
    console.log(err);
  }
});
