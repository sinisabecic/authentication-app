import React, { useState, useEffect } from "react";
import { Toaster } from "react-hot-toast";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  NavLink,
  Navigate,
} from "react-router-dom";

import Home from "./components/Home";
import Test from "./components/Test";
import Login from "./components/Login";
import Register from "./components/Register";
import PrivateRoute from "./PrivateRoute";
// import { auth } from "./auth/authService";
import { auth } from "./services/firebase";
import { onAuthStateChanged } from "firebase/auth";

function App() {
  const [currentUser, setCurrentUser] = useState(null);
  const [isAuth, setIsAuth] = useState(false);

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setIsAuth(true);
        setCurrentUser(user.displayName);
      } else setCurrentUser("");
    });
  }, []);

  return (
    <div>
      <Toaster />
      <Router>
        <nav className="nav bg-dark justify-content-start">
          <strong className="text-warning nav-link">{currentUser}</strong>

          <NavLink
            key="1"
            className={({ isActive }) =>
              isActive ? "nav-link text-primary" : "nav-link"
            }
            to="/"
          >
            Home
          </NavLink>

          <NavLink
            key="4"
            className={({ isActive }) =>
              isActive ? "nav-link text-primary" : "nav-link"
            }
            to="/test"
          >
            Test
          </NavLink>

          {isAuth ? (
            <a
              key="2"
              style={{ cursor: "pointer" }}
              className="nav-link"
              onClick={(e) => {
                e.preventDefault();
                auth.signOut();
                setIsAuth(false);
                localStorage.removeItem("accessToken");
                return <Navigate to="/login" />;
              }}
            >
              Logout
            </a>
          ) : (
            [
              <NavLink
                key="3"
                className={({ isActive }) =>
                  isActive ? "nav-link text-primary" : "nav-link"
                }
                to="/login"
              >
                Login
              </NavLink>,
              <NavLink
                key="4"
                className={({ isActive }) =>
                  isActive ? "nav-link text-primary" : "nav-link"
                }
                to="/register"
              >
                Register
              </NavLink>,
            ]
          )}
        </nav>

        <Routes>
          <Route path="/" element={<Home name={currentUser} />} />
          <Route path="/test" element={<Test />} />

          {/*//! Ovo !isAuth je nelogicno, ali samo u slucaju Login i Register stranice  */}
          <Route element={<PrivateRoute loggedIn={!isAuth} />}>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
          </Route>

          {/* //? Pogledati komentar iz Login.js props.toggleAuth(true/false); */}
          {/* <Route
            path="/login"
            element={<Login toggleAuth={toggleAuth}></Login>}
          /> */}
        </Routes>
      </Router>
    </div>
  );
}

export default App;
