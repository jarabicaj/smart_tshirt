import * as React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom"

const ButtonElement = styled.button`
  background-color: #31dab4;
  margin-top: 20px;
  padding: 5px;
  text-align: center;
  text-decoration: none;
  color: white;
  border-radius: 5px;
  border: none;
`;

const StyledLink = styled(Link)`
  color: white;
  text-decoration: none;
`;

const Button = (props: Props) => {
  return (
    <ButtonElement onClick={props.onCLick}>
      {props.linkTo ? <StyledLink to={props.linkTo}>{props.children}</StyledLink> : props.children}
      </ButtonElement>
  );
};

export default Button;
