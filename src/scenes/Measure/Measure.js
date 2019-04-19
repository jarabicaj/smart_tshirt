import React, { useContext, useState, useEffect } from "react";
import exgContext from "../../services/ecgContext";
import { Button } from "antd";

const PEAK = 300;

let interval = null;

const Measure = () => {
  const {
    measure: { data, frequency },
    perSecond
  } = useContext(exgContext);
  // console.log("measure", data);

  let peak = null;

  const [running, setRunning] = useState(false);
  const [time, setTime] = useState(0);

  // const [peak, setPeak] = useState(null);

  const [beats, setBeats] = useState(0);

  const toggle = () => {
    if (running) {
      clearInterval(interval);
      setRunning(false);
    } else {
      // setTime(0);
      interval = setInterval(() => {
        setTime(t => {
          checkPeak(data[t % data.length]);
          // if (t >= data.length) {
          //   return 0;
          // }
          return t + 1;
        });
        // checkPeak(data[time]);
      }, 1000 / frequency);
      setRunning(true);
    }
  };

  const clear = () => {
    setTime(0);
    setBeats(0);
  };

  const addBeat = () => {
    setBeats(beats => beats + 1);
  };

  const checkPeak = value => {
    // console.log("checkPeak", value);
    // Start of peak
    if (peak === null && value >= PEAK) {
      console.log("START");
      peak = { value, time, set: false };
      return;
    }
    // End of peak
    if (peak && value < PEAK) {
      console.log("END");
      peak = null;
      return;
    }

    // Ascending
    if (peak && value > peak.value) {
      peak = { value, time, set: false };
    }

    // Descending
    if (peak && value < peak.value && !peak.set) {
      // "ADDING BPM"
      addBeat();
      peak = { ...peak, set: true };
    }
  };

  const bpm = (60 * beats) / (time / frequency);

  return (
    <div>
      Measure. Time: {time}
      <br />
      Value: {running ? data[time % data.length] : 0}
      <br />
      Peak: {JSON.stringify(peak)}
      <br />
      Beats: {beats}
      <br />
      Bet per minute: {bpm}
      <br />
      Seconds: {time / frequency} <br />
      <Button onClick={toggle}>{running ? "Stop" : "Start"}</Button>
      {!running && <Button onClick={clear}>Clear</Button>}
    </div>
  );
};

export default Measure;
