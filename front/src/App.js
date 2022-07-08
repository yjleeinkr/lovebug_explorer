import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./Components/Header";
import Main from "./Pages/Main";
import Block from "./Pages/Block/Block";
import BlockList from "./Pages/Block/BlockList";
import BlockDetail from "./Pages/Block/BlockDetail";
import Tx from "./Pages/Tx/Tx";
import TxList from "./Pages/Tx/TxList";
import TxDetail from "./Pages/Tx/TxDetail";
import Account from "./Pages/Acct/Account";

import "./App.css";

function App() {
  return (
    <>
      <Router>
        <Header />
        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="/block" element={<Block />} />
          <Route path="/block/list" element={<BlockList />} />
          <Route path="/block/list/detail/:hash" element={<BlockDetail />} />
          <Route path="/transaction" element={<Tx />} />
          <Route path="/transaction/list" element={<TxList />} />
          <Route path="/transaction/list/detail/:hash" element={<TxDetail />} />
          <Route path="/account/detail/:acct" element={<Account />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
