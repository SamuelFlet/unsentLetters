import { Link, Outlet } from "react-router-dom";
import { gql, useQuery } from "@apollo/client";

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
    <div style={{ display: "flex" }}>
      <nav
        style={{
          borderRight: "solid 1px",
          padding: "1rem",
        }}
      >
        {data.getAllPosts.map((invoice) => (
          <Link
            style={{ display: "block", margin: "1rem 0" }}
            to={`/${invoice.id}`}
            key={invoice.id}
          >
            {invoice.id}
          </Link>
        ))}
      </nav>
      <Outlet />
    </div>
  );
}