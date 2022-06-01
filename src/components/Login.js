import React, { useRef, useState, useEffect } from "react";
import toast from "react-hot-toast";
import { auth as authService } from "../auth/authService";
import {
  faCheck,
  faTimes,
  faInfoCircle,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { auth } from "../services/firebase";
import { signInWithEmailAndPassword, updateProfile } from "firebase/auth";
import { useNavigate, Link } from "react-router-dom";

const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;
const EMAIL_REGEX =
  /^[a-z0-9][\-_\.\+\!\#\$\%\&\'\*\/\=\?\^\`\{\|]{0,1}([a-z0-9][\-_\.\+\!\#\$\%\&\'\*\/\=\?\^\`\{\|]{0,1})*[a-z0-9]@[a-z0-9][-\.]{0,1}([a-z][-\.]{0,1})*[a-z0-9]\.[a-z0-9]{1,}([\.\-]{0,1}[a-z]){0,}[a-z0-9]{0,}$/;

const Login = (props) => {
  let navigate = useNavigate();

  const emailRef = useRef();
  const errRef = useRef();

  const [email, setEmail] = useState("");
  const [validEmail, setValidEmail] = useState(false);

  const [pwd, setPwd] = useState("");
  const [validPwd, setValidPwd] = useState(false);
  const [pwdFocus, setPwdFocus] = useState(false);

  const [errMsg, setErrMsg] = useState("");
  const [successMsg, setSuccessMsg] = useState("");
  const [success, setSuccess] = useState(false);

  const [submitDisabled, setSubmitDisabled] = useState(false);

  useEffect(() => {
    emailRef.current.focus();
  }, []);

  useEffect(() => {
    setValidEmail(EMAIL_REGEX.test(email));
  }, [email]);

  useEffect(() => {
    setValidPwd(PWD_REGEX.test(pwd));
  }, [pwd]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const v1 = PWD_REGEX.test(pwd);
    const v2 = EMAIL_REGEX.test(email);
    if (!v1 || !v2) {
      setErrMsg("Invalid Entry");
      return;
    }

    setSubmitDisabled(true); //disable button

    await signInWithEmailAndPassword(auth, email, pwd)
      .then(async (res) => {
        setSubmitDisabled(false);

        console.log(res.user);
        console.log("Access token: ", res.user.accessToken);
        // ...
        setSuccess(true);
        setEmail("");
        setPwd("");
        // setSuccessMsg("Registration success");
        toast.success("Login success");
        authService.setJwt(res.user.accessToken);
        // props.toggleAuth(true); //? za slucaj da koristim <Login toggleAuth={naziv-funkcije-u-App.js}/>
      })
      .catch((error) => {
        setSubmitDisabled(false);
        if (error) {
          setErrMsg("Login failed");
          console.log(error?.message);
        }
        errRef.current.focus();
        // props.toggleAuth(false);
      });
  };

  return (
    <div className="container">
      <section>
        {success ? (
          <p
            className={successMsg ? "successmsg" : "offscreen"}
            aria-live="assertive"
          >
            {successMsg}
          </p>
        ) : (
          <p
            ref={errRef}
            className={errMsg ? "errmsg" : "offscreen"}
            aria-live="assertive"
          >
            {errMsg}
          </p>
        )}
        <h1>Login</h1>
        <form onSubmit={handleSubmit}>
          {/*//* EMAIL */}
          <label htmlFor="email">
            E-mail:
            <FontAwesomeIcon
              icon={faCheck}
              className={validEmail ? "valid" : "hide"}
            />
            <FontAwesomeIcon
              icon={faTimes}
              className={validEmail || !email ? "hide" : "invalid"}
            />
          </label>
          <input
            type="email"
            id="email"
            ref={emailRef}
            autoComplete="off"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            required
            aria-invalid={validEmail ? "false" : "true"}
            aria-describedby="uidnote"
            // onFocus={() => setEmailFocus(true)}
            // onBlur={() => setEmailFocus(false)}
          />

          <label htmlFor="password">
            Password:
            <FontAwesomeIcon
              icon={faCheck}
              className={validPwd ? "valid" : "hide"}
            />
            <FontAwesomeIcon
              icon={faTimes}
              className={validPwd || !pwd ? "hide" : "invalid"}
            />
          </label>
          <input
            type="password"
            id="password"
            onChange={(e) => setPwd(e.target.value)}
            value={pwd}
            required
            aria-invalid={validPwd ? "false" : "true"}
            aria-describedby="pwdnote"
            onFocus={() => setPwdFocus(true)}
            onBlur={() => setPwdFocus(false)}
          />
          <p
            id="pwdnote"
            className={pwdFocus && !validPwd ? "instructions" : "offscreen"}
          >
            <FontAwesomeIcon icon={faInfoCircle} />
            8 to 24 characters.
            <br />
            Must include uppercase and lowercase letters, a number and a special
            character.
            <br />
            Allowed special characters:{" "}
            <span aria-label="exclamation mark">!</span>{" "}
            <span aria-label="at symbol">@</span>{" "}
            <span aria-label="hashtag">#</span>{" "}
            <span aria-label="dollar sign">$</span>{" "}
            <span aria-label="percent">%</span>
          </p>

          <button
            className="btn btn-success"
            disabled={!validEmail || !validPwd || submitDisabled ? true : false}
          >
            Login
          </button>
        </form>
        <p>
          Dont have account?
          <br />
          <span className="line">
            {/*put router link here*/}
            <Link to="/register" className="text-primary">
              Sign up
            </Link>
          </span>
        </p>
      </section>
    </div>
  );
};

export default Login;
