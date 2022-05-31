import React, { useState } from "react";
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

function App() {
  // const [isAuth, setIsAuth] = useState(auth.getAuthStatus());

  // const toggleAuth = (status) => {
  //   if (!status) {
  //     auth.logout();
  //   }
  //   setIsAuth(status);
  // };

  return (
    <div>
      <Toaster />
      <Router>
        <nav className="nav bg-dark justify-content-start">
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
          <Route path="/" element={<Home />} />

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
