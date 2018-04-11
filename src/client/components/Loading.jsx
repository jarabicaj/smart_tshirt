import * as React from "react";
import styled, { keyframes } from "styled-components";

import COLORS from "../constants/colors"

const bounceDelay = keyframes`
  0%, 80%, 100% { transform: scale(0) }
  40% { transform: scale(1.0) }
`;

const Spinner = styled.div`
  margin: 100px auto 0;
  width: 70px;
  text-align: center;
  
  &>div {
    width: 18px;
    height: 18px;
    background-color: ${COLORS.secondary};
    border-radius: 100%;
    display: inline-block;
    -webkit-animation: ${bounceDelay} 1.4s infinite ease-in-out both;
    animation: ${bounceDelay} 1.4s infinite ease-in-out both;
  }
`;

const Bounce1 = styled.div`
  animation-delay: -0.32s !important;
`;
const Bounce2 = styled.div`
  animation-delay: -0.16s !important;
`;
const Bounce3 = styled.div``;

const Loading = () => (
    <Spinner>
      <Bounce1/>
      <Bounce2/>
      <Bounce3/>
    </Spinner>
);

export default Loading;
