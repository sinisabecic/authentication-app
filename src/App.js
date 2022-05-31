import React, { useState, useEffect } from "react";
import { Toaster } from "react-hot-toast";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  NavLink,
} from "react-router-dom";

import Home from "./components/Home";
import Login from "./components/Login";
import Register from "./components/Register";
// import { auth } from "./auth/authService";
import { auth } from "./services/firebase";
import { onAuthStateChanged } from "firebase/auth";

function App() {
  const [username, setUsername] = useState("");
  const [isAuth, setIsAuth] = useState(false);

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        console.log("Logged in: " + user.displayName);
        setUsername(user.displayName);
      } else setUsername("");
    });
  }, []);

  return (
    <div>
      <Toaster />
      <Router>
        <nav className="nav bg-dark justify-content-start">
          <NavLink className="nav-link" to="/">
            User: {username}
          </NavLink>

          <NavLink className="nav-link" to="/">
            Home
          </NavLink>

          {/* {isAuth ? (
            <a className="nav-link" onClick={() => toggleAuth(false)}>
              Logout
            </a>
          ) : (
            <NavLink className="nav-link" to="/login">
              Login
            </NavLink>
          )} */}

          <NavLink className="nav-link" to="/login">
            Login
          </NavLink>

          <NavLink className="nav-link" to="/register">
            Register
          </NavLink>
        </nav>

        <Routes>
          <Route path="/" element={<Home name={username} />} />

          {/* <Route
            path="/login"
            element={<Login toggleAuth={toggleAuth}></Login>}
          /> */}

          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
