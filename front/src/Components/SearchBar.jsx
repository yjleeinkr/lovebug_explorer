import styled from "styled-components";
import { useRef, useState } from "react";

const SearchBarTemp = styled.form`
  width: 600px;
  height: 50px;
  border: dashed 0.5px #a4a9a4;
  display: flex;
  padding: 5px;
  box-sizing: border-box;
  border-radius: 10px 10px;
  box-shadow: 0px 3px 8px #a4a9a4;
`;

const Select = styled.select`
  padding: 2px 10px;
  border: 0.5px solid #a4a9a4;
  background-color: transparent;
  border-radius: 3px 3px;
  font-family: "Roboto Slab", serif;
  &:focus {
    outline: none;
  }
`;

const Input = styled.input`
  padding-left: 5px;
  box-sizing: border-box;
  width: 450px;
  border: 0.5px solid #a4a9a4;
  border-radius: 3px 3px;
  background-color: transparent;
  margin: 0px 2px;
  font-family: "Roboto Slab", serif;
  &:focus {
    outline: none;
  }
`;

const Button = styled.button`
  width: 70px;
  border-radius: 3px 3px;
  background-color: #e4e8d3;
  border: 0.5px solid #a4a9a4;
  font-family: "Roboto Slab", serif;
`;

const SearchBar = () => {
  const selectRef = useRef();
  const [searchValue, setSearchValue] = useState("");
  const [optValue, setOptValue] = useState("");

  const changeOpt = () => {
    const select = selectRef.current;
    const option = select.options[select.options.selectedIndex].value;
    setOptValue(option);
  };

  const handleInput = (e) => {
    setSearchValue(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    switch (optValue) {
      case "account":
        window.location.href = `/account/detail/:${searchValue}`;
        break;
      case "blockHash":
        window.location.href = `/block/list/detail/:${searchValue}`;
        break;
      case "txHash":
        window.location.href = `/transaction/list/detail/:${searchValue}`;
        break;
      default:
        window.location.href = "/";
    }
  };

  return (
    <>
      <SearchBarTemp onSubmit={handleSubmit}>
        <Select onChange={changeOpt} ref={selectRef}>
          <option value="">filter</option>
          <option value="account">account</option>
          <option value="txHash">tx Hash</option>
          <option value="blockHash">block Hash</option>
        </Select>
        <Input
          type="text"
          placeholder="Searched by Account / Txn Hash / Block Hash"
          onChange={handleInput}
          value={searchValue}
        />
        <Button type="submit">search</Button>
      </SearchBarTemp>
    </>
  );
};

export default SearchBar;
