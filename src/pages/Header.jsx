import { gql, useMutation } from "@apollo/client";
import { Fragment } from "react";

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
  let title;
  let description;
  const [createPost, {loading, error }] = useMutation(ADD_POST);
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
          }}
        >
          <div>
            <input
              ref={(node) => {
                title = node;
              }}
            />
          </div>
          <div>
            <textarea 
              ref={(node) => {
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
