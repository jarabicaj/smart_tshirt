import React from "react";

const Load = ({ fillData }) => {
  const loadData = files => {
    console.log("files", files);
    const reader = new FileReader();
    reader.onload = () => {
      fillData(reader.result);
    };
    reader.readAsText(files[0]);
  };

  return <input type="file" onChange={e => loadData(e.target.files)} />;
};

export default Load;
