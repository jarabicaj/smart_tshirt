import { init as testingStreamInit } from "./testingStream/index";
import { init as tshirtStreamInit } from "./tshirtStream/index";

export const startStreaming = callback => {
  const close = testingStreamInit(callback, 250, 100)
  // const close = tshirtStreamInit(callback, 100)

  return close;
};
