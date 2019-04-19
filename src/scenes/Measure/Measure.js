import React, { useContext, useState } from "react";
import { Button } from "antd";

import exgContext from "../../services/ecgContext";
import Chart from "./components/Chart";

const VISUAL_DATA_LENGTH = 2000;

const PEAK = 300;

let interval = null;

const Measure = () => {
  const {
    measure: { data, frequency },
    perSecond
  } = useContext(exgContext);

  let peak = null;

  const [running, setRunning] = useState(false);
  const [time, setTime] = useState(0);
  const [visualData, setVisualData] = useState([]);

  // const [peak, setPeak] = useState(null);

  const [beats, setBeats] = useState(0);

  const value = data[time % data.length];

  const addValueToVisualData = (timestamp, value) => {
    setVisualData(visual =>
      visual.concat([{ timestamp, value }]).slice(-VISUAL_DATA_LENGTH)
    );
  };

  const toggle = () => {
    if (running) {
      clearInterval(interval);
      setRunning(false);
    } else {
      // setTime(0);
      interval = setInterval(() => {
        setTime(t => {
          const value = data[t % data.length];
          addValueToVisualData(t, value);
          checkPeak(value);
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
    // Start of peak
    if (peak === null && value >= PEAK) {
      peak = { value, time, set: false };
      return;
    }
    // End of peak
    if (peak && value < PEAK) {
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

  const seconds = time / frequency;

  const bpm = (60 * beats) / seconds;

  return (
    <div>
      Measure. Time: {time}
      <br />
      Value: {running ? value : 0}
      <br />
      Peak: {JSON.stringify(peak)}
      <br />
      Beats: {beats}
      <br />
      Bet per minute: {bpm}
      <br />
      Seconds: {seconds} <br />
      <Button onClick={toggle}>{running ? "Stop" : "Start"}</Button>
      {!running && <Button onClick={clear}>Clear</Button>}
      <Chart data={visualData} timestamp={Math.floor(seconds * 10)} />
    </div>
  );
};

export default Measure;
