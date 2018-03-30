import React from "react";
import ReactDOM from "react-dom";

import App from "./App";

ReactDOM.render(<App />, document.getElementById("app"));

// console.log("Hello World!");
// const ws = new WebSocket("ws://localhost:3000");
//
// ws.onopen = () => {
//   console.log("opened");
//
//   ws.onmessage = messageEvent => {
//     const message = JSON.parse(messageEvent.data);
//     console.log("received:", message);
//     // if (message.type === "identify" && message.status === "success") {
//     //   console.log("sucess!!");
//     }
//   };
//
//   ws.send(
//     JSON.stringify({
//       data: "hello"
//     })
//   );
// };
