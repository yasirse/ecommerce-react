import { useEffect, useRef, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  Form,
  Link,
  redirect,
  useLocation,
  useNavigate,
} from "react-router-dom";
import { signInStart, signInError, signInSuccess } from "../store/userSlice";
import { changeTab } from "../store/tabSlice";
import { useDispatch } from "react-redux";
const apiUrl = import.meta.env.VITE_APP_API_URL;

const SignIn = () => {
  const [email, setEmail] = useState("");
  const [isEmailValid, setIsEmailValid] = useState();
  const [isEmailTouched, setIsEmailTouched] = useState(false);
  const password = useRef();
  const [errorMsg, setErrorMsg] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  dispatch(changeTab(""));

  const location = useLocation();
  const reset_pass = location.state || false;
  useEffect(() => {
    if (reset_pass) {
      console.log("in sign in toast");
      toast.success("Password Updated Successfully. Please Login!", {
        position: "top-right",
        autoClose: 5000,
      });
    }
  }, [reset_pass]);

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const handleEmailChange = (e) => {
    const value = e.target.value;
    setEmail(value);
    setIsEmailValid(emailRegex.test(value));
    setIsEmailTouched(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      dispatch(signInStart());
      const res = await fetch(`${apiUrl}/api/auth/signin`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: email,
          password: password.current.value,
        }),
      });
      const data = await res.json();
      console.log("Received login data", data.message);
      if (res.status === 401) {
        dispatch(signInError(data.message));
        setErrorMsg(data.message);
        return;
      } else if (res.status === 200) {
        console.log("200 ok", data.token);
        dispatch(changeTab("home"));
        dispatch(signInSuccess(data));
        navigate("/");
      } else {
        dispatch(signInError(data.message));
        setErrorMsg(data.message);
        return;
      }
    } catch (error) {
      dispatch(signInError("Failed to fetch"));
      setErrorMsg("Failed to fetch");
      return;
    }
  };

  return (
   
    <div className="container-fluid d-flex flex-column flex-sm-row justify-content-center align-items-center min-vh-100 ">
      <ToastContainer />
      <div className="col-1 col-sm-2"></div>
      <div className="col-12 col-sm-6 ">
        <form method="POST" onSubmit={handleSubmit} className="text-left p-4  border rounded"  
    style={{ backgroundColor: "#f0f8ff"}} >
        <h4>Sign in</h4>
        <div className="mb-3">
          <label htmlFor="exampleFormControlInput1" className="form-label">
            Email address
          </label>
          <input
            type="email"
            value={email}
            onChange={handleEmailChange}
            className="form-control"
            id="exampleFormControlInput1"
            placeholder="name@example.com"
          />
          {isEmailTouched && (
            <div
              style={{
                fontSize: "14px",
                color: isEmailValid ? "green" : "#FF775e",
              }}
            >
              {isEmailValid
                ? "valid email format"
                : "enter valid email address"}
            </div>
          )}
        </div>
        <div className="mb-3">
          <label htmlFor="inputPassword5" className="form-label">
            Password
          </label>
          <input
            type="password"
            ref={password}
            id="inputPassword5"
            className="form-control"
            aria-describedby="passwordHelpBlock"
          />
        </div>

        <button type="submit" className="btn btn-primary">
          Sign-In
        </button>
        <Link
          to={{ pathname: "/forgot-password", previous_page: "login" }}
          className="card-link forgot-text"
        >
          Forgot Password
        </Link>
        <p className="text-danger">{errorMsg}</p>
      </form>
      </div>
      <div className="col-1 col-sm-2 "></div>
    </div>
   

  );
};
export default SignIn;
