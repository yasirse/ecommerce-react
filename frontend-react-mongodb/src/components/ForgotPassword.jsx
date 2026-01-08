/**
 * ForgotPassword form — collects user email to request a reset code.
 * Uses `VITE_APP_API_URL` and navigates to OTP flow on success.
 */
import { useState } from "react";
import { useNavigate } from "react-router-dom";
const apiUrl = import.meta.env.VITE_APP_API_URL;
const ForgotPassword = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [isEmailValid, setIsEmailValid] = useState();
  const [errorMsg, setErrorMsg] = useState("");

  // Email validation regex
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  // Handle email input change
  const handleEmailChange = (e) => {
    const value = e.target.value;
    setEmail(value);
    setIsEmailValid(emailRegex.test(value));
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isEmailValid) {
      try {
        const res = await fetch(`${apiUrl}/api/auth/forgot-password`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            email: email,
          }),
        });
        const data = await res.json();
        console.log("Received forgot password data", data.message);
        if (res.status === 200) {
          console.log("200 ok", data);
          navigate("/otp-forgot-password", { state: data });
        } else {
          setErrorMsg(data.message);
          return;
        }
      } catch (error) {
        setErrorMsg("Failed to fetch");
        return;
      }
    }
  };
  return (
    <div className="container container-div">
      <form method="POST" onSubmit={(e) => handleSubmit(e)}>
        <h4>Forgot Password</h4>
        <div className="mb-3">
          <label htmlFor="exampleFormControlInput1" className="form-label">
            Email address
          </label>
          <input
            value={email}
            onChange={handleEmailChange}
            type="email"
            className="form-control"
            id="exampleFormControlInput1"
            placeholder="name@example.com"
          />
          <div
            style={{
              fontSize: "14px",
              color: isEmailValid ? "green" : "#FF775e",
            }}
          >
            {isEmailValid ? "valid email" : "enter valid email address"}
          </div>
        </div>

        <button type="submit" className="btn btn-primary">
          Send Code
        </button>
        <p className="text-danger">{errorMsg}</p>
      </form>
    </div>
  );
};
export default ForgotPassword;
