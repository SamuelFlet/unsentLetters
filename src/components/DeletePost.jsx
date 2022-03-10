import { useParams } from "react-router-dom";
import { gql, useMutation } from "@apollo/client";
import { useNavigate } from "react-router-dom";

export const HELLO = gql`
  mutation Mutation($deletePostId: ID) {
    deletePost(id: $deletePostId)
  }
`;

export default function Invoice() {
  let navigate = useNavigate();
  const routeChange = () => {
    navigate("/");
  };
  let params = useParams();
  let deletePostId = params.postId;
  const [deletePost, { error }] = useMutation(HELLO);
  if (error) return <p>ERROR</p>;

  return (
    <button
      onClick={(e) => {
        deletePost({
          variables: {
            deletePostId,
          },
        });
        routeChange();
      }}
    >
      Delete
    </button>
  );
}
