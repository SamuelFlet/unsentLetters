import { useParams, useNavigate } from "react-router-dom";
import { gql, useQuery, useMutation } from "@apollo/client";
import Button from "@mui/material/Button";
import * as React from "react";

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

export const DELETE = gql`
  mutation Mutation($getPostId: ID) {
    deletePost(id: $getPostId)
  }
`;

export default function Invoice() {
  let navigate = useNavigate();
  const routeChange = () => {
    navigate("/");
  };

  let params = useParams();
  let getPostId = params.postId;
  const { error, data } = useQuery(HELLO, {
    variables: { getPostId },
  });
  const [deletePost] = useMutation(DELETE);
  if (error) return <p>ERROR</p>;
  if (!data) return <p>Not found</p>;
  let x = parseInt(data.getPost.created_at);
  var z = new Date(x).toDateString();
  const update = () => {
    navigate("/update",{state:{id:data.getPost.id,name:'sabaoon'}});
  };
  return (
    <main style={{ padding: "1rem" }}>
      <h1>{data.getPost.title}</h1>
      {z}
      <p>{data.getPost.description}</p>

      <br></br>
      <Button
        id="basic-button"
        onClick={(e) => {
          deletePost({
            variables: {
              getPostId,
            },
          });
          routeChange();
        }}
      >
        DELETE LETTER
      </Button>
      <Button
        id="basic-button"
        onClick={(e) => {
          update();
        }}
      >
        UPDATE LETTER
      </Button>
    </main>
  );
}
