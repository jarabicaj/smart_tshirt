import R from "ramda";
import fs from "fs";
import path from "path";
import { Readable } from "stream";
import byline from "byline";

import debounce from "../debounce";

class TestingStream extends Readable {
  stream = null;
  originalStream = null;
  delay = 4;
  closed = false;

  constructor(options) {
    super(options);
    this.delay = options.frequency ? 1000 / options.frequency : 4;
    this.handleStreamData();
  }

  setNewStream = () => {
    this.originalStream = fs.createReadStream(
      path.join(__dirname, "./squareData.txt"),
      {
        encoding: "utf8"
      }
    );

    this.stream = byline(this.originalStream);
  };

  handleStreamData = () => {
    if (this.closed) return;

    this.setNewStream();
    this.stream.on("data", data => {
      if (this.closed) return;
      this.stream.pause();
      setTimeout(() => {
        this.stream.resume();
      }, this.delay);
      this.push(data);
    });
    this.stream.on("end", () => {
      // console.log("on end");
      this.handleStreamData();
    });
  };

  _read(size) {}

  close() {
    this.closed = true;
  }
}

export const init = (callback, frequency = 250, debounceTime = 100) => {
  const stream = new TestingStream({ frequency });

  let collectedData = [];

  let cursor = 0;

  const sendData = () => {
    console.log("calling send data", cursor);
    const oldCursor = cursor;
    cursor = collectedData.length;
    callback(R.slice(oldCursor, cursor, collectedData));
  };
  const debounced = debounce(sendData, debounceTime);

  stream.on("data", rawData => {
    const parsedData = rawData.toString();
    const data = {
      time: new Date(),
      value: Number(parsedData)
    };
    collectedData.push(data);
    debounced();
  });

  const close = () => {
    stream.close();
  };

  return close;
};
