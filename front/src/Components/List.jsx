import styled from "styled-components";

const WrapTemp = styled.ul`
  background-color: #e4e8d3;
  height: 70vh;
  padding: 30px;
  box-sizing: border-box;
  border-radius: 10px;
  border: dashed 1px #0b3f0c;
  overflow: scroll;
`;

const ListTemp = styled.li`
  margin: 20px 0px;
`;

const ArtTemp = styled.span`
  display: inline-block;
  width: 17%;
  font-weight: 700;
`;

const ParagraphTemp = styled.p`
  font-style: italic;
  & > a {
    color: #1f6d20;
  }
`;

export const Wrap = ({ children, ...rest }) => {
  return <WrapTemp {...rest}>{children}</WrapTemp>;
};

export const List = ({ children, ...rest }) => {
  return <ListTemp {...rest}>{children}</ListTemp>;
};

export const Article = ({ children, ...rest }) => {
  return <ArtTemp {...rest}>{children}</ArtTemp>;
};
export const Paragraph = ({ children, ...rest }) => {
  return <ParagraphTemp {...rest}>{children}</ParagraphTemp>;
};
