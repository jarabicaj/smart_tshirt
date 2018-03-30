import express from "express";
import http from "http";

// Services
import { init as initDatabase } from "./database/index";
import { startStreaming } from "./streamer/index";
import initConnector from "./connector/index";

// const database = initDatabase()

// const close = startStreaming(data => {
//   // console.log("data", data);
// });
//
// setTimeout(() => {
//   console.log("closed, data collected:", close());
// }, 1000);

// const app = express();
const server = http.createServer();

initConnector(server);

server.listen(5000, () => {
  console.log("listening on :3000");
});
