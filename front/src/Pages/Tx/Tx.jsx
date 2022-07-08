import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Section, Scroll } from "../../Components/Section";
import { Title, Clicker } from "../../Components/Title";
import { Box } from "../../Components/Box";
import axios from "axios";

const Tx = (props) => {
  const [tx, setTx] = useState([]);
  const { socket } = props;

  const renderTx = async () => {
    const url = "http://localhost:4000/api/transaction/getLatest";
    const result = await axios.post(url);
    setTx(result.data);
  };

  useEffect(() => {
    renderTx();
  }, []);

  useEffect(() => {
    socket.on("get_minedTx", (data) => {
      const { minedTx } = data;
      setTx([minedTx, ...tx]);
    });
  }, [tx]);

  const getTxList = () =>
    tx.map((_tx, idx) => {
      return (
        <Link to={`/transaction/list/detail/:${_tx.txHash}`}>
          <Box key={idx}>
            <li style={{ fontWeight: "bold" }}>{_tx.txHash}</li>
            <li>From : {_tx.sender}</li>
            <li>To : {_tx.recipient}</li>
            <li>when : {_tx.timestamp}</li>
          </Box>
        </Link>
      );
    });

  return (
    <Section>
      <Title>
        Latest Transaction
        <Link to="/transaction/list">
          <Clicker>View all tx? Click Me!</Clicker>
        </Link>
      </Title>

      <Scroll>{getTxList()}</Scroll>
    </Section>
  );
};

export default Tx;
