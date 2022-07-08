import { Title } from "../../Components/Title";
import Responsive from "../../Components/Responsive";
import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { List, Wrap, Article, Paragraph } from "../../Components/List";

const BlockDetail = () => {
  const { hash } = useParams();
  const [blockDetail, setBlockDetail] = useState({});
  const [error, setError] = useState(false);

  const getBlockDetail = async (_hash) => {
    const url = `http://localhost:4000/api/block/getDetails/${_hash}`;

    try {
      const result = await axios.post(url);
      if (!result.data) throw new Error();
      setBlockDetail(result.data);
    } catch (err) {
      setError(true);
    }
  };

  useEffect(() => {
    getBlockDetail(hash);
  }, []);

  const renderDetails = () => {
    return (
      <>
        <List>
          <Article>Block Height:</Article>
          <span>{blockDetail.number}</span>
        </List>
        <List>
          <Article>Block Hash:</Article>
          <span>{blockDetail.hash}</span>
        </List>
        <List>
          <Article>Mined by:</Article>
          <Link to={`/account/detail/:${blockDetail.miner}`}>
            <span>{blockDetail.miner}</span>
          </Link>
        </List>
        <List>
          <Article>Timestamp:</Article>
          <span>{blockDetail.timestamp}</span>
        </List>
        <List>
          <Article>Difficulty:</Article>
          <span>{blockDetail.difficulty}</span>
        </List>
        <List>
          <Article>Nonce:</Article>
          <span>{blockDetail.nonce}</span>
        </List>
        <List>
          <Article>gas Limit:</Article>
          <span>{blockDetail.gasLimit}</span>
        </List>
        <List>
          <Article>gas Used:</Article>
          <span>{blockDetail.gasUsed}</span>
        </List>
        <List>
          <Article>Tx Hash:</Article>
          {blockDetail.transaction ? (
            blockDetail.transaction.map((v, k) => (
              <Paragraph key={k}>
                <Link to={`/transaction/list/detail/:${v}`}>{v}</Link>
              </Paragraph>
            ))
          ) : (
            <span>no transaction</span>
          )}
        </List>
      </>
    );
  };
  return (
    <Responsive>
      <Title>Block #{blockDetail.number}</Title>
      {error ? (
        <h2> sorry! we couldn't find your block.. Plz try again! 🥺</h2>
      ) : (
        <Wrap className="detail">{renderDetails()}</Wrap>
      )}
    </Responsive>
  );
};

export default BlockDetail;
