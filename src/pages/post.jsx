import { useParams } from "react-router-dom";
import { gql, useQuery } from "@apollo/client";
import Delete from "../components/DeletePost.jsx";

export const HELLO = gql`
  query ExampleQuery($getPostId: ID) {
    getPost(id: $getPostId) {
      id
      title
      created_at
      description
    }
  }
`;

export default function Invoice() {
  let params = useParams();
  let getPostId = params.postId;
  const { error, data } = useQuery(HELLO, {
    variables: { getPostId },
  });
  if (error) return <p>ERROR</p>;
  if (!data) return <p>Not found</p>;
  let x = parseInt(data.getPost.created_at);
  var z = new Date(x).toDateString();
  return (
    <main style={{ padding: "1rem" }}>
      <h1>{data.getPost.title}</h1>
      {z}
      <p>{data.getPost.description}</p>
      <Delete />
    </main>
  );
}
