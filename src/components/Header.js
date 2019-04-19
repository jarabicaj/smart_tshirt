import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { Flex } from "primitives-react";

const Container = styled(Flex)`
  border-bottom: 1px solid black;
`;

const Header = () => {
  return (
    <Container>
      <Link to="/">Set measure</Link>
      <Link to="/results/">Results</Link>
    </Container>
  );
};

export default Header;
