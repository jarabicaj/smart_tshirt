import React, { useContext } from "react";
import ecgContext from "../../services/ecgContext";
import { Table } from "antd";

const COLUMNS = [
  {
    title: "Name",
    dataIndex: "name",
    key: "name"
  },
  {
    title: "Age",
    dataIndex: "age",
    key: "age"
  },
  {
    title: "BPM",
    dataIndex: "bpm",
    key: "bpm"
  },
  {
    title: "Average R amplitude",
    dataIndex: "ramp",
    key: "ramp"
  }
];

const Results = () => {
  const { results } = useContext(ecgContext);

  return (
    <div>
      <Table columns={COLUMNS} dataSource={results} />
    </div>
  );
};

export default Results;
