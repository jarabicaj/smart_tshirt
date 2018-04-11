import * as React from "react";
import styled from "styled-components";
import COLORS from "../constants/colors";

const Card = styled.div`
  border: 1px solid ${COLORS.grey};
  padding: 20px;
  border-radius: 5px;
  margin: 0 5px;
  width: 50%;
`;

export default Card;
