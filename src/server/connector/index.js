import WebSocket from "ws";

const init = server => {
  const wss = new WebSocket.Server({ server });

  wss.on("connection", ws => {
    console.log("connected!");
    ws.on("message", data => {
      const message = JSON.parse(data);
      console.log("message", message);
      // if (message.type === "identify") {
      // identify(message, ws, dbConnector);
      // }
    });
  });
};

export default init;
