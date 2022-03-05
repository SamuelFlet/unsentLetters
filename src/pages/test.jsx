import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";

const Test = () => {
  return (
    <Router>
      <div>
        <nav>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/about">About</Link>
            </li>
            <li>
              <Link to="/users">Users</Link>
            </li>
          </ul>
        </nav>
      </div>
    </Router>
  );
};



export default Test;
