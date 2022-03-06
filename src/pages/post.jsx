import { useParams } from "react-router-dom";
import { gql, useQuery } from "@apollo/client";

export const HELLO = gql`
  query ExampleQuery($getPostId: ID) {
    getPost(id: $getPostId) {
      id
      title
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

  return (
    <main style={{ padding: "1rem" }}>
      <h1>{data.getPost.title}</h1>
      <p>{data.getPost.description}</p>
    </main>
  );
}
