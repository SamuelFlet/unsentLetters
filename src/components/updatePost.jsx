import { useParams } from "react-router-dom";
import { Fragment } from "react";
import { gql, useMutation } from "@apollo/client";
import { useNavigate } from "react-router-dom";
import { TextField } from "@mui/material";

export const HELLO = gql`
  mutation Mutation($updatePostId: ID, $title: String, $description: String) {
    updatePost(id: $updatePostId, title: $title, description: $description) {
      id
      title
      description
      created_at
    }
  }
`;

export default function Invoice() {
  let navigate = useNavigate();
  const routeChange = () => {
    navigate("/");
  };
  let title;
  let description;
  let params = useParams();
  let updatePostId = params.postId;
  const [updatePost, { error }] = useMutation(HELLO);
  if (error) return <p>ERROR</p>;

  return (
      <div>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            updatePost({
              variables: { updatePostId, title: title.value, description: description.value },
            });

            title.value = "";
            description.value = "";
            window.location.reload();
          }}
        >
          <div>
            <TextField label="Title" variant="standard"
              inputRef={(node) => {
                title = node;
              }}
            />
          </div>
          <br></br>
          <div>
            <TextField
          id="outlined-multiline-static"
          label="Letter Content"
          multiline
          rows={4}
          inputRef={(node) => {
            description = node;
          }}
        />
          </div>

          <button type="submit">Update Letter</button>
        </form>
      </div>
  );
}
