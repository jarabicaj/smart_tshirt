import React from "react";
import { Menu, Icon } from "antd";
import { withRouter } from "react-router";

const Header = props => {
  const handleClick = e => {
    props.history.push(e.key);
  };

  return (
    <Menu
      onClick={handleClick}
      selectedKeys={[props.location.pathname]}
      mode="horizontal"
      style={{ marginBottom: 20 }}
    >
      <Menu.Item key="/">
        <Icon type="reconciliation" />
        Measure
      </Menu.Item>
      <Menu.Item key="/results">
        <Icon type="table" />
        Results
      </Menu.Item>
    </Menu>
  );
};

export default withRouter(Header);
