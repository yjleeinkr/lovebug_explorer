import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { Title } from "../../Components/Title";
import Responsive from "../../Components/Responsive";
import { Wrap, List, Article } from "../../Components/List";
import axios from "axios";

const TxDetail = () => {
  const { hash } = useParams();
  const [txDetail, setTxDetail] = useState({});
  const [error, setError] = useState(false);

  const getTxDetail = async (_hash) => {
    const url = `http://localhost:4000/api/transaction/getDetails/${_hash}`;
    try {
      const result = await axios.post(url);
      setTxDetail(result.data);
    } catch (err) {
      setError(true);
    }
  };

  useEffect(() => {
    getTxDetail(hash);
  }, []);

  const renderDetails = () => {
    return (
      <>
        <List>
          <Article>tx Hash:</Article>
          <span>{txDetail.txHash}</span>
        </List>
        <List>
          <Article>Block Number:</Article>
          <Link to={`/block/list/detail/:${txDetail.blockHash}`}>
            <span>{txDetail.blockNumber}</span>
          </Link>
        </List>
        <List>
          <Article>Date Time (KR):</Article>
          <span>{txDetail.timestamp}</span>
        </List>
        <List>
          <Article>From:</Article>
          <Link to={`/account/detail/:${txDetail.sender}`}>
            <span>{txDetail.sender}</span>
          </Link>
        </List>
        <List>
          <Article>To:</Article>
          <Link to={`/account/detail/:${txDetail.recipient}`}>
            <span>{txDetail.recipient}</span>
          </Link>
        </List>
        <List>
          <Article>Value:</Article>
          <span>{txDetail.value}</span>
        </List>
        <List>
          <Article>gas Limit:</Article>
          <span>{txDetail.gasLimit}</span>
        </List>
        <List>
          <Article>gas Price:</Article>
          <span>{txDetail.gasPrice}</span>
        </List>
        <List>
          <Article>Tx Fee:</Article>
          <span>{txDetail.txFee}</span>
        </List>
      </>
    );
  };

  return (
    <Responsive>
      <Title>Transaction</Title>
      {error ? (
        <h2>sorry! we couldn't find your tx.. Plz try again! 🥺</h2>
      ) : (
        <Wrap>{renderDetails()}</Wrap>
      )}
    </Responsive>
  );
};

export default TxDetail;
