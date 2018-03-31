import R from "ramda"
// import debounce from "debounce"

import { init as testingStreamInit } from "./testingStream/index";

// https://stackoverflow.com/questions/14028148/convert-integer-array-to-string-at-javascript
const convertToInt16ArrayString = bufferData => {
  const arr = new Int16Array(bufferData);
  let str = "";
  arr.forEach(elem => {
    str += "%" + ("0" + elem.toString(16)).slice(-2);
  });
  console.log("bufferData", bufferData);
  console.log("Int16Array", arr);
  console.log("str", str);
  console.log("result", decodeURIComponent(str));
  return decodeURIComponent(str);
};

const debounce = (func, wait) => {
  let last = 0;

  return (...args) => {
    const now = new Date().getTime();
    if (now - wait > last) {
      last = now;
      func(args)
    }
  }

}

export const startStreaming = callback => {
  const stream = testingStreamInit(125);
  const collectedData = [];

  let cursor = 0;

  const sendData = () => {
    console.log("calling send data", cursor)
    const oldCursor = cursor;
    cursor = collectedData.length;
    callback(R.slice(oldCursor, cursor, collectedData));
  }

  const debounced = debounce(sendData, 100);

  stream.on("data", rawData => {
    // TODO: manipulate with rawData...
    const parsedData = convertToInt16ArrayString(rawData);
    const data = {
      time: new Date(),
      value: Number(parsedData),
    }
    debounced()
    collectedData.push(data);
  });

  const close = () => {
    // TODO: implement close
    stream.close();
    return collectedData;
  };

  return close;
};

// export const init = () => {
//   const stream = testingStreamInit()
//
//   stream.on
// }
