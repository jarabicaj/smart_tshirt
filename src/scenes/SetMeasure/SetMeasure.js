import React, { useState, useContext } from "react";
import { Flex } from "primitives-react";
import { withRouter } from "react-router";
import { Input, InputNumber, Button } from "antd";

import ecgContext from "../../services/ecgContext";

const SetMeasure = props => {
  const { setMeasure } = useContext(ecgContext);
  const [name, setName] = useState("");
  const [age, setAge] = useState(18);
  const [data, setData] = useState([]);
  const [frequency, setFrequency] = useState(10);

  const loadData = e => {
    const files = e.target.files;
    console.log("files", files);
    const reader = new FileReader();
    reader.onload = () => {
      setData(reader.result.split(";").map(x => Number(x.replace(",", "."))));
    };
    reader.readAsText(files[0]);
  };

  const start = () => {
    setMeasure({ name, age, data, frequency });
    props.history.push("/measure");
  };

  return (
    <Flex direction="column">
      SetMeasure
      <Input
        type="text"
        placeholder="name"
        onChange={e => setName(e.target.value)}
        value={name}
      />
      <InputNumber value={age} min={0} max={130} onChange={setAge} />
      <Input type="file" placeholder="name" onChange={loadData} />
      <InputNumber
        value={frequency}
        min={0}
        max={512}
        onChange={setFrequency}
      />
      <Button onClick={start}>Start</Button>
    </Flex>
  );
};

export default withRouter(SetMeasure);
