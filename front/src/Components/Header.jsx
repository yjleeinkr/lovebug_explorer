import styled from "styled-components";
import Responsive from "./Responsive";
import { Link } from "react-router-dom";
import SearchBar from "./SearchBar";

const Wrapper = styled(Responsive)`
  height: 150px;
  width: 100%;
  display: flex;
  justify-content: space-around;
  align-items: center;
`;

const Logo = styled.h1`
  font-family: "arial";
  font-size: 35px;
  color: #0b3f0c;
  font-family: "Roboto Slab", serif;
`;

const Header = () => {
  return (
    <Wrapper>
      <Link to="/">
        <Logo>LoveBug🕷Explorer</Logo>
      </Link>
      <SearchBar />
    </Wrapper>
  );
};

export default Header;
