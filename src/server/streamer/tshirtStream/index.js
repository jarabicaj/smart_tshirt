import { Readable } from "stream";
import R from "ramda";
import serialport from "serialport";

import debounce from "../debounce";

const convertToFloatArray = bufferData => {
  let buffer = new Int16Array(bufferData);
  // [1, 32767, 0, -1, -32768]
  let result = new Float32Array(buffer.length);
  // TODO: rewrite to map
  for (let i = 0; i < buffer.length; i++) {
    result[i] = {
      value: buffer[i] / (buffer[i] >= 0 ? 32767 : 32768),
      time: new Date()
    };
  }
  // allResults = allResults.concat(...result)
  return result;
};

const send = (command, stream) => {
  console.log("sending", command);
  stream.write(command + "\r\n");
};

export const init = (callback, debounceTime) => {
  const stream = new serialport("COM5", {
    baudRate: 115200,
    dataBits: 8,
    parity: "none",
    stopBits: 1,
    xon: false,
    xoff: false,
    xany: false,
    rtscts: true,
    parser: new serialport.parsers.Readline("\r\n")
    //parser: new serialport.parsers.ByteLength(1)
  });

  let aok = 0;
  let tracking = false;

  let collectedData = [];
  let cursor = 0;
  const sendData = () => {
    console.log("calling send data", cursor);
    const oldCursor = cursor;
    cursor = collectedData.length;
    callback(R.slice(oldCursor, cursor, collectedData));
  };
  const debounced = debounce(sendData, debounceTime);

  stream.on("open", () => {
    send("F", stream);
  });

  stream.on("data", data => {
    const dataString = data.toString();
    if (dataString.includes("AOK")) {
      if (aok === 0) {
        aok = 1;
        send("X", stream);
        return;
      }
      if (aok === 1) {
        aok = 2;
        send("E,0,001EC03E3807", stream);
        return;
      }
    }
    if (dataString.includes("Connected")) {
      stream.set({ dtr: false }, () => {
        console.log("DTR off");
      });
      return;
    }
    if (dataString.includes("MLDP")) {
      send("M", stream);
      return;
    }
    if (dataString.includes("Select mode")) {
      tracking = true;
      send("S", stream);
      setTimeout(() => {
        send("S", stream);
      }, 1000);
      return;
    }
    if (dataString.includes("Connection End")) {
      tracking = false;
      if (stream.isOpen) {
        stream.close();
      }
      return;
    }
    if (!tracking) return;

    // Correct data
    const parsedData = convertToFloatArray(data);
    // TODO: callback
    collectedData = collectedData.concat(parsedData);
    debounced();
  });

  const close = () => {
    aok = 0;
    tracking = false;
    send("X");
    setTimeout(() => {
      stream.set({ drt: true }, () => {
        send("K");
      });
    }, 1000);
  };

  return close;
};
