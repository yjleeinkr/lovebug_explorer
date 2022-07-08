import axios from "axios";
import { useEffect, useState } from "react";
import { Table } from "../../Components/Table";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { Title } from "../../Components/Title";

const SubTitle = styled(Title)`
  justify-content: center;
  margin: 20px 0px;
`;

const TxList = () => {
  const [txList, setTxList] = useState([]);

  const getTxList = async () => {
    const url = "http://localhost:4000/api/transaction/getList";
    const result = await axios.post(url);
    setTxList(result.data);
  };

  useEffect(() => {
    getTxList();
  }, []);

  const renderTxList = () =>
    txList.map((_tx, k) => {
      return (
        <tr className="tx_list" key={k}>
          <td className="tx_hash">
            <Link to={`/transaction/list/detail/:${_tx.txHash}`}>
              {_tx.txHash}
            </Link>
          </td>
          <td className="tx_height">{_tx.blockNumber}</td>
          <td className="tx_date">{_tx.timestamp}</td>
          <td className="tx_from">{_tx.from}</td>
          <td className="tx_to">{_tx.to}</td>
          <td className="tx_value">{_tx.value}</td>
          <td className="tx_fee">{_tx.txFee}</td>
        </tr>
      );
    });

  return (
    <>
      <SubTitle>Tx Overview</SubTitle>
      <Table>
        <thead>
          <tr id="category">
            <td className="tx_hash">Tx Hash</td>
            <td className="tx_height">Block#</td>
            <td className="tx_date">Date Time (KR) </td>
            <td className="tx_from">From</td>
            <td className="tx_to">To</td>
            <td className="tx_value">Value</td>
            <td className="tx_fee">TxFee</td>
          </tr>
        </thead>
        <tbody>{renderTxList()}</tbody>
      </Table>
    </>
  );
};

export default TxList;
