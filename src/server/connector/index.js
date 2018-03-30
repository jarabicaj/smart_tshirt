import WebSocket from "ws";
import mongoose from "mongoose"

import { startStreaming } from "../streamer/index";

import * as valuesApi from "../database/models/values/api"
import * as statsApi from "../database/models/stats/api"

const init = server => {
  const wss = new WebSocket.Server({ server });

  wss.on("connection", ws => {
    console.log("connected!");
    let cancelStream = null;
    let userId = null;
    ws.on("message", async data => {
      const message = JSON.parse(data);
      console.log("message", message);
      if (message.type === "start") {
        userId = message.userId;
        ws.send(
          JSON.stringify({
            type: "start"
          })
        );
        cancelStream = startStreaming(data => {
          ws.send(
            JSON.stringify({
              type: "data",
              data
            })
          );
        });
      }
      if (message.type === "stop") {
        if (!cancelStream) return;
        const streamData = cancelStream();
        // TODO: save streamData to db
        cancelStream = null;
        userId = null;
        const savedValues = await valuesApi.saveValues({data: streamData})
        await statsApi.saveStats({
          userId: mongoose.Types.ObjectId(userId),
          from: streamData[0].time,
          to: streamData[streamData.length - 1].time,
          values: mongoose.Types.ObjectId(savedValues._id)
        })
        ws.send(
          JSON.stringify({
            type: "stop",
            data: streamData,
          })
        );
      }
    });
  });
};

export default init;
