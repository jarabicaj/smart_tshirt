import { init as testingStreamInit } from "./testingStream/index";

// https://stackoverflow.com/questions/14028148/convert-integer-array-to-string-at-javascript
const convertToInt16ArrayString = bufferData => {
  const arr = new Int16Array(bufferData);
  let str = "";
  arr.forEach(elem => {
    str += "%" + ("0" + elem.toString(16)).slice(-2);
  });
  // console.log("bufferData", bufferData);
  // console.log("Int16Array", arr);
  // console.log("str", str);
  // console.log("result", decodeURIComponent(str));
  return decodeURIComponent(str);
};

export const startStreaming = callback => {
  const stream = testingStreamInit(250);
  const collectedData = [];
  stream.on("data", rawData => {
    // TODO: manipulate with rawData...
    const parsedData = convertToInt16ArrayString(rawData);
    const data = {
      time: new Date(),
      value: parsedData,
    }
    callback(data);
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
