import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import styled from "styled-components";
import Responsive from "../../Components/Responsive";
import { Title } from "../../Components/Title";
import { Section } from "../../Components/Section";

const Wrapper = styled(Responsive)`
  margin-top: 30px;
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 73vh;
  justify-content: space-evenly;
  overflow: scroll;
`;

const WiderSection = styled(Section)`
  width: 100%;
  margin-bottom: 50px;
  overflow: scroll;
`;
const Account = () => {
  const { acct } = useParams();
  const [balance, setBalance] = useState("");
  const [blockDetail, setBlockDetail] = useState([]);
  const [txDetail, setTxDetail] = useState([]);
  const [error, setError] = useState(false);

  const getAcctDetail = async (_acct) => {
    const url = `http://localhost:4000/api/account/getDetails/${_acct}`;
    try {
      const result = await axios.post(url);
      if (!result.data) throw new Error();
      const { balanceEth, blockArr, txArr } = result.data;
      setBalance(balanceEth);
      setBlockDetail(blockArr);
      setTxDetail(txArr);
      console.log(result.data);
    } catch (err) {
      setError(true);
    }
  };

  useEffect(() => {
    getAcctDetail(acct);
  }, []);

  const renderTx = () =>
    txDetail.map((_tx, k) => {
      return (
        <ul key={k}>
          <li>TxHash: {_tx.txHash}</li>
          <li>From : {_tx.from}</li>
          <li>To : {_tx.to}</li>
          <li>Value : {_tx.value}</li>
          <li>Block# : {_tx.blockNumber}</li>
          <li>Timestamp : {_tx.timestamp}</li>
        </ul>
      );
    });

  const renderBlock = () =>
    blockDetail.map((_block, k) => {
      return (
        <ul key={k}>
          <li>Block#: {_block.number}</li>
          <li>hash: {_block.hash}</li>
        </ul>
      );
    });

  return (
    <Responsive>
      <Title>Account# {acct.substring(1)}</Title>
      {error ? (
        <h2> sorry! this account is not found. Plz try again! 🥺</h2>
      ) : (
        <>
          <h3>balance : {balance} eth </h3>
          <Wrapper>
            <Title>Transaction ({txDetail.length})</Title>
            <WiderSection>{renderTx()}</WiderSection>
            <Title>Mined Block ({blockDetail.length})</Title>
            <WiderSection>{renderBlock()}</WiderSection>
          </Wrapper>
        </>
      )}
    </Responsive>
  );
};

export default Account;
