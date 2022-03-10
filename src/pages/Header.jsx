import { gql, useMutation } from "@apollo/client";
import { Fragment } from "react";
import { useNavigate } from "react-router-dom";
import { TextField } from "@mui/material";

const ADD_POST = gql`
  mutation Mutation($title: String, $description: String) {
    createPost(title: $title, description: $description) {
      id
      title
      description
    }
  }
`;

export default function Comment() {
  let navigate = useNavigate();
  const routeChange = () => {
    navigate("/");
  };
  let title;
  let description;
  const [createPost, { loading, error }] = useMutation(ADD_POST);
  if (loading) return "Submitting...";
  if (error) return "Submission error!";

  return (
    <Fragment>
      <div>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            createPost({
              variables: { title: title.value, description: description.value },
            });

            title.value = "";
            description.value = "";
            routeChange();
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

          <button type="submit">Add Todo</button>
        </form>
      </div>
    </Fragment>
  );
}
