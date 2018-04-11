import * as React from "react";
import styled from "styled-components";
import COLORS from "../constants/colors";

const InputText = styled.input`
  border-width: 0 0 1px;
  &:focus {
    outline: none;
  }
  ::placeholder {
    color: ${COLORS.grey};
  }
`;

export default InputText;
