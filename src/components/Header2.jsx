import * as React from "react";
import Toolbar from "@mui/material/Toolbar";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { Link } from "react-router-dom";
import "../style/testing.css";
import styled from "styled-components";

const StyledLink2 = styled(Link)`
  color: White;
  text-decoration: none;
  position: relative;
`;
const StyledLink = styled(Link)`
  color: Black;
  text-decoration: none;
  position: relative;
`;

function Header(_props) {
  return (
    <React.Fragment>
      <Toolbar sx={{ borderBottom: 1, borderColor: "divider" }}>
      <Button variant="contained" component="span">
        <StyledLink2 to="/newPost">New Post</StyledLink2>
        </Button>
        <Typography
          component="h2"
          variant="h5"
          color="inherit"
          align="center"
          noWrap
          sx={{ flex: 1 }}
        >
          <StyledLink to="/">Unsent Letters</StyledLink>
        </Typography>
      </Toolbar>
    </React.Fragment>
  );
}

export default Header;
