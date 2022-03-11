import { useParams, useNavigate } from "react-router-dom";
import { gql, useQuery, useMutation } from "@apollo/client";
import Update from "../components/updatePost.jsx";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import * as React from "react";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

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
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);

  const [ope, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleclo = () => setOpen(false);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
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

  return (
    <main style={{ padding: "1rem" }}>
      <Button
        id="basic-button"
        aria-controls={open ? "basic-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        onClick={handleClick}
      >
        Dashboard
      </Button>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          "aria-labelledby": "basic-button",
        }}
      >
        <MenuItem
          onClick={(e) => {
            deletePost({
              variables: {
                getPostId,
              },
            });
            routeChange();
          }}
        >
          Delete Letter
        </MenuItem>
        <MenuItem onClick={handleOpen}>Update Letter</MenuItem>
        <Modal
          open={ope}
          onClose={handleclo}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            <Update />
          </Box>
        </Modal>
      </Menu>
      <h1>{data.getPost.title}</h1>
      {z}
      <p>{data.getPost.description}</p>
    </main>
  );
}
