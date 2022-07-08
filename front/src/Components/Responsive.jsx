import styled from "styled-components";

const ResponsiveTemp = styled.div`
  width: 1024px;
  height: 100%;
  margin: 0 auto;
  overflow: hidden;

  @media screen and (max-width: 1024px) {
    width: 768px;
  }

  @media screen and (max-width: 768px) {
    width: 100vw;
  }

  @media screen and (max-width: 320px) {
    width: 100vw;
  }
`;

const Responsive = ({ children, ...rest }) => {
  return <ResponsiveTemp {...rest}>{children}</ResponsiveTemp>;
};

export default Responsive;
