import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Section, Scroll } from "../../Components/Section";
import { Title, Clicker } from "../../Components/Title";
import { Box } from "../../Components/Box";
import axios from "axios";

const Block = (props) => {
  const [block, setBlock] = useState([]);
  const { socket } = props;

  const renderBlock = async () => {
    const url = "http://localhost:4000/api/block/getLatest";
    const result = await axios.post(url);
    setBlock(result.data);
  };

  useEffect(() => {
    renderBlock();
  }, []);

  useEffect(() => {
    socket.on("get_minedBlock", (data) => {
      const { minedBlock } = data;
      setBlock([minedBlock, ...block]);
    });
  }, [block]);

  const getBlockList = () =>
    block.map((block, idx) => {
      return (
        <Link to={`/block/list/detail/:${block.hash}`}>
          <Box key={idx}>
            <li style={{ fontWeight: "bold" }}>{block.number}</li>
            <li style={{ overflow: "hidden", textOverflow: "ellipsis" }}>
              {block.hash}
            </li>
            <li>miner : {block.miner}</li>
            <li>time: {block.timestamp}</li>
          </Box>
        </Link>
      );
    });

  return (
    <Section>
      <Title>
        Latest Block
        <Link to="/block/list" state={{ socket }}>
          <Clicker>View all box? Click Me!</Clicker>
        </Link>
      </Title>
      <Scroll>{getBlockList()}</Scroll>
    </Section>
  );
};

export default Block;
