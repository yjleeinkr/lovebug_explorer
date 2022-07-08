import Responsive from "../Components/Responsive";
import { Link } from "react-router-dom";
import Block from "./Block/Block";
import Tx from "./Tx/Tx";
import styled from "styled-components";
import io from "socket.io-client";
import { useEffect, useState } from "react";

const Wrapper = styled(Responsive)`
  margin-top: 30px;
  display: flex;
  width: 100%;
  height: 73vh;
  justify-content: space-evenly;
`;

const Main = () => {
  const [socket, setSocket] = useState(null);

  useEffect(() => {
    const socket = io.connect("http://127.0.0.1:4000");
    setSocket(socket);

    return () => {
      socket.disconnect();
    };
  }, []);

  return (
    <Wrapper>
      {socket && (
        <>
          <Block socket={socket} />
          <Tx socket={socket} />
        </>
      )}
    </Wrapper>
  );
};

export default Main;
