import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import styled from "styled-components";
import Responsive from "../../Components/Responsive";
import { Title } from "../../Components/Title";
import { Section } from "../../Components/Section";

const Wrapper = styled(Responsive)`
  margin-top: 30px;
  display: flex;
  width: 100%;
  height: 73vh;
  justify-content: space-evenly;
`;

const Account = () => {
  const { acct } = useParams();
  const [balance, setBalance] = useState("");
  const [blockDetail, setBlockDetail] = useState([]);
  const [txDetail, setTxDetail] = useState([]);
  const [error, setError] = useState(false);

  const getAcctDetail = async (_acct) => {
    const convertedAcct = _acct.toLowerCase();
    const url = `http://localhost:4000/api/account/getDetails/${convertedAcct}`;
    try {
      const result = await axios.post(url);
      if (!result.data) throw new Error();
      const { balanceEth, blockArr, txArr } = result.data;
      setBalance(balanceEth);
      setBlockDetail(blockArr);
      setTxDetail(txArr);
    } catch (err) {
      setError(true);
    }
  };

  useEffect(() => {
    getAcctDetail(acct);
  }, []);

  return (
    <Responsive>
      <Title>Account# {acct.substring(1)}</Title>
      {error ? (
        <h2> sorry! this account is not found. Plz try again! 🥺</h2>
      ) : (
        <>
          <h3>balance : {balance} eth </h3>
          <Wrapper>
            <Section>아 귀찮아</Section>
            <Section>아 언제해</Section>
          </Wrapper>
        </>
      )}
    </Responsive>
  );
};

export default Account;
