import styled from "styled-components";

const SectionTemp = styled.div`
  width: 46%;
  height: 100%;
  overflow: hidden;
  color: #0b3f0c;
  border: solid 1px #a6b2a6;
  padding: 20px;
  box-sizing: border-box;
  border-radius: 10px 10px;
`;

const ScrollTemp = styled.div`
  margin-top: 20px;
  width: 100%;
  height: 90%;
  overflow: scroll;
`;

export const Section = ({ children, ...rest }) => {
  return <SectionTemp {...rest}>{children}</SectionTemp>;
};

export const Scroll = ({ children, ...rest }) => {
  return <ScrollTemp {...rest}>{children}</ScrollTemp>;
};
