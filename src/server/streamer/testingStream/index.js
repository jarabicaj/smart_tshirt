import fs from "fs";
import path from "path";
import { Readable } from "stream";
import byline from "byline";

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

export const init = (frequency = 250) => {
  return new TestingStream({ frequency });
};
