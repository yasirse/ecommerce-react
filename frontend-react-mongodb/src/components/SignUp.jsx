import { useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { changeTab } from "../store/tabSlice";
import { useNavigate } from "react-router-dom";
const apiUrl = import.meta.env.VITE_APP_API_URL;

const SignUp = () => {
  const signup_res = {
    name: "",
    email: "",
    token: "",
    refreshToken: "",
    otp_value: "",
  };
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rePassword, setRePassword] = useState("");
  const [isEmailValid, setIsEmailValid] = useState();
  const [isEmailTouched, setIsEmailTouched] = useState(false);
  const [isPasswordValid, setIsPasswordValid] = useState();
  const [isPasswordMatch, setIsPasswordMatch] = useState();
  const [ispasswordTouched, setIsPasswordTouched] = useState(false);
  const [ispasswordRenterTouched, setIsPasswordRenterTouched] = useState(false);
  const dispatch = useDispatch();
  dispatch(changeTab(""));
  // Email validation regex
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  // Password validation regex (example: at least 8 characters, one letter, and one number)
  const passwordRegex =
    /(?=^.{8,}$)((?=.*\d)(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/;
  // Handle email input change
  const handleEmailChange = (e) => {
    const value = e.target.value;
    setEmail(value);
    setIsEmailValid(emailRegex.test(value));
    setIsEmailTouched(true); // Mark email as touched
  };

  // Handle password input change
  const handlePasswordChange = (e) => {
    const value = e.target.value;
    setPassword(value);
    setIsPasswordValid(passwordRegex.test(value));
    setIsPasswordMatch(value === rePassword);
    setIsPasswordTouched(true);
  };
  // Handle re-enter password input change
  const handleRePasswordChange = (e) => {
    const value = e.target.value;
    setRePassword(value);
    setIsPasswordMatch(value === password);
    setIsPasswordRenterTouched(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isEmailValid && isPasswordMatch && isPasswordValid) {
      console.log(name, email, password);
      // Server Request
      try {
        const res = await fetch(`${apiUrl}/api/auth/signup`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            name: name,
            email: email,
            password: password,
          }),
        });

        const data = await res.json();
        console.log("Received SignUp data", data);
        if (res.status === 401) {
          setError(data.message);
          return;
        } else if (res.status === 200) {
          signup_res.name = data.name;
          signup_res.email = data.email;
          signup_res.token = data.token;
          signup_res.refreshToken = "refreshToken";
          signup_res.otp_value = data.otp;
          navigate("/otp-signup", { state: signup_res });
        } else {
          setError(data.message);
          return;
        }
      } catch (error) {
        setError("Network Problem, please try again!");
        return;
      }
    }
  };
  return (
    <div className="container-fluid d-flex flex-column flex-sm-row justify-content-center align-items-center vh-100  ">
      <div className="col-1 col-sm-2"></div>
      <div className="col-12 col-sm-6 ">
        <form method="POST" onSubmit={handleSubmit} className="text-left p-4  border rounded"   style={{ backgroundColor: "#f0f8ff"}}>
        <h4>Sign up</h4>
        <div className="mb-2">
          <label htmlFor="name" className="form-label">
            Name
          </label>
          <input
            type="text"
            className="form-control"
            placeholder="Enter Name"
            minLength={3}
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div className="mb-2">
          <label htmlFor="exampleFormControlInput1" className="form-label">
            Email address
          </label>
          <input
            type="email"
            className="form-control"
            id="exampleFormControlInput1"
            placeholder="name@example.com"
            required
            value={email}
            onChange={handleEmailChange}
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
        <div className="mb-2">
          <label htmlFor="inputPassword5" className="form-label">
            Password
          </label>
          <input
            type="password"
            id="inputPassword5"
            required
            className="form-control"
            aria-describedby="passwordHelpBlock"
            value={password}
            onChange={handlePasswordChange}
            minLength={8}
          />
          {ispasswordTouched && (
            <div
              style={{
                fontSize: "14px",
                color: isPasswordValid ? "green" : "#FF775e",
              }}
            >
              {isPasswordValid
                ? "valid password format"
                : "invalid password format"}
            </div>
          )}
          <div id="passwordHelpBlock" className="form-text">
            password must contain at least 08 characters, including at least 01
            number, both lower and uppercase letters and at least 01 special
            character.
          </div>
        </div>
        <div className="mb-2">
          <label htmlFor="inputPassword5" className="form-label">
            Re-Enter Password
          </label>
          <input
            type="password"
            id="inputPassword6"
            required
            minLength={8}
            onChange={handleRePasswordChange}
            className="form-control"
            aria-describedby="passwordHelpBlock"
            value={rePassword}
          />
          {ispasswordRenterTouched && (
            <div
              style={{
                fontSize: "14px",
                color: isPasswordMatch ? "green" : "#FF775e",
              }}
            >
              {isPasswordMatch ? "passwords match" : "passwords do not match"}
            </div>
          )}
        </div>

        <button type="submit" className="btn btn-primary">
          Sign-Up
        </button>
        <p className="text-danger">{error}</p>
      </form></div>
      <div className="col-1 col-sm-2 "></div>
    </div>
  );
};
export default SignUp;
