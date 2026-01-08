/**
 * SetNewPassword — form to reset user's password after OTP verification.
 * Expects `location.state.user.email` and calls `/api/auth/reset-password`.
 */
import React, { useState } from "react";
import { Navigate, useLocation, useNavigate } from "react-router-dom";
const apiUrl = import.meta.env.VITE_APP_API_URL;
const SetNewPassword = () => {
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const [password, setPassword] = useState("");
  const [rePassword, setRePassword] = useState("");
  const [isPasswordValid, setIsPasswordValid] = useState();
  const [isPasswordMatch, setIsPasswordMatch] = useState();
  const location = useLocation();
  const server_res = location.state || null; // {otp, user: {id, name,email, password, token}}
  if (!server_res) {
    console.log(server_res);
    return <Navigate to="/sign-in" />;
  }
  // Password validation regex (example: at least 8 characters, one letter, and one number)
  const passwordRegex =
    /(?=^.{8,}$)((?=.*\d)(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/;
  // Handle password input change
  const handlePasswordChange = (e) => {
    const value = e.target.value;
    setPassword(value);
    setIsPasswordValid(passwordRegex.test(value));
    setIsPasswordMatch(value === rePassword);
  };
  // Handle re-enter password input change
  const handleRePasswordChange = (e) => {
    const value = e.target.value;
    setRePassword(value);
    setIsPasswordMatch(value === password);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isPasswordMatch && isPasswordValid) {
      console.log(server_res.user.email, password);
      // Server Request
      try {
        const res = await fetch(
          `${apiUrl}/api/auth/reset-password`,
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              email: server_res.user.email,
              password: password,
            }),
          }
        );

        const data = await res.json();
        console.log("Received reset password data", data);
        if (res.status === 401) {
          setError(data.message);
          return;
        } else if (res.status === 200) {
          navigate("/sign-in", { state: "true" });
        } else {
          setError(data.message);
          return;
        }
      } catch (error) {
        console.log(error);
        setError("Network Problem, please try again!");
        return;
      }
    }
  };
  return (
    <div className="container container-div">
      <form
        method="POST"
        className="signup container-div"
        onSubmit={handleSubmit}
      >
        <h4>Re-set Password</h4>
        <div className="mb-3">
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
          <div id="passwordHelpBlock" className="form-text">
            password must contain at least 08 characters, including at least 01
            number, both lower and uppercase letters and at least 01 special
            character.
          </div>
        </div>
        <div className="mb-3">
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
          <div
            style={{
              fontSize: "14px",
              color: isPasswordMatch ? "green" : "#FF775e",
            }}
          >
            {isPasswordMatch ? "passwords match" : "passwords do not match"}
          </div>
        </div>

        <button type="submit" className="btn btn-primary">
          Reset Password
        </button>
        <p className="text-danger">{error}</p>
      </form>
    </div>
  );
};

export default SetNewPassword;
