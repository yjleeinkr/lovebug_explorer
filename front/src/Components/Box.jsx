import styled from "styled-components";

const BoxTemp = styled.ul`
  color: #0b3f0c;
  background-color: #d7dacc;
  border: dashed 1px #889088;
  border-radius: 10px 10px;
  padding: 10px;
  box-shadow: 0px 1px 5px #7e827e;

  &:hover {
    background-color: #b2b7a1;
  }
`;

export const Box = ({ children, ...rest }) => {
  return <BoxTemp {...rest}>{children}</BoxTemp>;
};
