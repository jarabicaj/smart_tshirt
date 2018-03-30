import express from "express";
import bodyParser from "body-parser";
import http from "http";

// Services
import { init as initDatabase } from "./database/index";
import { startStreaming } from "./streamer/index";
import initConnector from "./connector/index";

import apiRouter from "./api/index";

// const database = initDatabase()

// const close = startStreaming(data => {
//   // console.log("data", data);
// });
//
// setTimeout(() => {
//   console.log("closed, data collected:", close());
// }, 1000);

const initServer = async () => {
  const app = express();
  const server = http.createServer(app);

  // app.use(bodyParser.urlencoded({ extended: true }));
  app.use(bodyParser.json())

  const db = await initDatabase();

  initConnector(server);

  app.use("/api", apiRouter(db));

  const PORT = 3000;

  server.listen(PORT, () => {
    console.log("websocket server listening on port:", PORT);
  });
};

initServer();
