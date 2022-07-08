import styled from "styled-components";
import "./table.css";

const TableTemp = styled.table`
  width: 1250px;
  margin: 20px auto;
  border-top: 2px solid #333;
  border-collapse: collapse;
  table-layout: fixed;
`;

export const Table = ({ children, ...rest }) => {
  return <TableTemp {...rest}>{children}</TableTemp>;
};
