import React from "react";
import ReactDOM from "react-dom";
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
} from "@apollo/client";
import "./index.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Posts from "./pages/posts.jsx";
import Post from "./pages/post.jsx";

import reportWebVitals from "./reportWebVitals";

const client = new ApolloClient({
  cache: new InMemoryCache(),
  uri: "https://polar-brook-36280.herokuapp.com/graphql",
  headers: {
    authorization: localStorage.getItem("token") || "",
    "client-name": "Space Explorer [web]",
    "client-version": "1.0.0",
  },
  resolvers: {},
});

ReactDOM.render(
  <ApolloProvider client={client}>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Posts />}>
          <Route path=":postId" element={<Post />} />
        </Route>
      </Routes>
    </BrowserRouter>
    ,
  </ApolloProvider>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
