import * as React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";

import COLORS from "../constants/colors";

const ButtonElement = styled.button`
  background-color: ${props => props.disabled ? COLORS.grey : COLORS.secondary};
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
  & > button {
    width: 100%;
  }
`;

const Button = (props: Props) => {
  if (!props.disabled && props.linkTo) {
    return (
      <StyledLink to={props.linkTo}>
        <ButtonElement>{props.children}</ButtonElement>
      </StyledLink>
    );
  }

  return (
    <ButtonElement disabled={props.disabled} onClick={props.onClick}>
      {props.children}
    </ButtonElement>
  );
};

export default Button;
