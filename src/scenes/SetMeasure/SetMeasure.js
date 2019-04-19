import React, { useState, useContext } from "react";
import styled from "styled-components";
import { Flex } from "primitives-react";
import { withRouter } from "react-router";
import { Input, Alert, Typography, InputNumber, Button } from "antd";

import ecgContext from "../../services/ecgContext";

const { Text } = Typography;

const Container = styled(Flex)`
  .ant-input,
  .ant-input-number,
  .ant-btn {
    width: 100%;
    margin: 0 8px 0 0;
  }
`;

const Content = styled(Flex)`
  max-width: 400px;
  margin: 0 auto;
`;

const SetMeasure = props => {
  const { setMeasure, addResult } = useContext(ecgContext);
  const [name, setName] = useState("");
  const [age, setAge] = useState(18);
  const [data, setData] = useState([]);
  const [frequency, setFrequency] = useState(256);

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
    <Container direction="column">
      <Content direction="column">
        <Alert message="Insert your innitial settings" type="info" />
        <br />
        <Text strong>Name</Text>
        <Input
          type="text"
          placeholder="name"
          onChange={e => setName(e.target.value)}
          value={name}
        />
        <br />
        <Text strong>Age</Text>
        <InputNumber block value={age} min={0} max={130} onChange={setAge} />
        <br />
        <Text strong>Data file</Text>
        <Input type="file" placeholder="name" onChange={loadData} />
        <br />
        <Text strong>Sample frequency</Text>
        <InputNumber
          value={frequency}
          min={0}
          max={512}
          onChange={setFrequency}
        />
        <br />
        <Button type="primary" onClick={start}>
          Continue
        </Button>
      </Content>
    </Container>
  );
};

export default withRouter(SetMeasure);
