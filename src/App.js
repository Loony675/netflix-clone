import React from "react";
import Home from "./screens/Home";
import Login from "./screens/Login";


import "./App.css";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {
  const user = null
  return (
    <div className="app">
      <Router>
        {!user ? (
          <Login />
        ) : (
          <Routes>
            <Route exact path="/" element={<Home />}></Route>
          </Routes>
        )}
      </Router>
    </div>
  );
}

export default App;
