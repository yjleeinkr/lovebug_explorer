import axios from "axios";
import { useEffect, useState } from "react";
import { Table } from "../../Components/Table";
import { Link } from "react-router-dom";
import { Title } from "../../Components/Title";
import styled from "styled-components";

const SubTitle = styled(Title)`
  justify-content: center;
  margin: 20px 0px;
`;
const BlockList = () => {
  const [blockList, setBlockList] = useState([]);

  const getBlockList = async () => {
    const url = `http://localhost:4000/api/block/getList`;
    const result = await axios.post(url);
    setBlockList(result.data);
  };

  useEffect(() => {
    getBlockList();
  }, []);

  const renderBlockList = () =>
    blockList.map((_block, k) => {
      return (
        <tr className="block_list" key={k}>
          <td className="height">{_block.number}</td>
          <td className="hash">
            <Link to={`/block/list/detail/:${_block.hash}`}>{_block.hash}</Link>
          </td>
          <td className="date">{_block.timestamp}</td>
          <td className="txn">{_block.txn}</td>
          <td className="miner">{_block.miner}</td>
          <td className="gas_used">{_block.gasUsed}</td>
          <td className="gas_limit">{_block.gasLimit}</td>
        </tr>
      );
    });

  return (
    <>
      <SubTitle>Block Overview</SubTitle>
      <Table>
        <thead>
          <tr id="category">
            <td className="height">Block Height</td>
            <td className="hash">Block Hash</td>
            <td className="date">Date Time (KR) </td>
            <td className="txn">Txn</td>
            <td className="miner">Miner</td>
            <td className="gas_used">Gas Used</td>
            <td className="gas_limit">Gas Limit</td>
          </tr>
        </thead>
        <tbody>{renderBlockList()}</tbody>
      </Table>
    </>
  );
};

export default BlockList;
