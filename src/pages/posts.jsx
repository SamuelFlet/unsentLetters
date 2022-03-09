import { Link, Outlet } from "react-router-dom";
import { gql, useQuery } from "@apollo/client";
import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";

export const GET_LAUNCHES = gql`
  query Query {
    getAllPosts {
      id
      title
      description
    }
  }
`;

export default function Invoices() {
  const { data, error } = useQuery(GET_LAUNCHES);
  if (error) return <p>ERROR</p>;
  if (!data) return <p>Not found</p>;
  return (
    <Table style={{ display: "flex" }}>
      <TableBody>
      <TableHead>
          <TableRow>
            <TableCell>Title</TableCell>
            <TableCell>Link to Letter</TableCell>
            <TableCell>Update Post</TableCell>
            <TableCell>Delete Post</TableCell>
          </TableRow>
        </TableHead>
          {data.getAllPosts.map((row) => (
            <TableRow key={row.id}>
              <TableCell>{row.title}</TableCell>
              <TableCell component={Link} to={`/${row.id}`}>{`${row.id}`}</TableCell>
            </TableRow>
          ))}
        </TableBody>
    </Table>
  );
}
