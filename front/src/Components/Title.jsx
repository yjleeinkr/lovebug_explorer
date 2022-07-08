import styled from "styled-components";

const TitleTemp = styled.h2`
  color: #0b3f0c;
  margin: 0;
  display: flex;
  justify-content: space-between;
`;

const ClickTemp = styled.span`
  color: #0b3f0c;
  font-size: 15px;
  margin-right: 10px;
  border-bottom: solid 1px #0b3f0c;

  &:hover {
    color: orange;
  }
`;

export const Title = ({ children, ...rest }) => {
  return <TitleTemp {...rest}>{children}</TitleTemp>;
};

export const Clicker = ({ children, ...rest }) => {
  return <ClickTemp>{children}</ClickTemp>;
};
