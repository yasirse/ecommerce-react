/**
 * OTP verification for sign-up — confirms user OTP and completes sign-in.
 * Dispatches `signInSuccess` and navigates to home on success.
 */
import { useState } from "react";
import OtpInput from "react-otp-input";
import { Navigate, useLocation, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { signInSuccess } from "../store/userSlice";

const OTPSignUp = () => {
  const [otp, setOtp] = useState("");
  const navigate = useNavigate();
  const [isInvalid, setIsInvalid] = useState(false);
  const location = useLocation();
  const dispatch = useDispatch();
  const signup_res = location.state || null;
  if (!signup_res) return <Navigate to="/sign-up" />;
  const user_data = {
    name: signup_res.name,
    email: signup_res.email,
    token: signup_res.token,
    refreshToken: signup_res.refreshToken,
  };

  const containerStyle = {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    marginTop: "80px",
    flexDirection: "column",
  };

  //Handle Change in OTP value
  const handleChange = (otp) => {
    setOtp(otp);
  };

  // This function is checking the user entered OTP and updating the redux sign in state
  const handleSubmit = () => {
    if (otp.length === 6 && /^[0-9]{6}$/.test(otp)) {
      // OTP is valid, proceed with submission
      setIsInvalid(false);
      if (otp === signup_res.otp_value) {
        console.log("OTP matched");
        dispatch(signInSuccess(user_data));
        navigate("/");
      } else setIsInvalid(true);
    } else {
      // OTP is invalid
      setIsInvalid(true);
    }
  };
  return (
    <div style={containerStyle}>
      <div>
        <OtpInput
          value={otp}
          onChange={handleChange}
          numInputs={6}
          isInputNum={true}
          shouldAutoFocus={true}
          renderSeparator={
            <span
              style={{
                fontSize: "7px",
                marginLeft: "5px",
                marginRight: "5px",
              }}
            >
              {" "}
            </span>
          }
          renderInput={(props) => <input {...props} />}
          inputStyle={{
            width: "30px",
            marginBottom: "10px",
            height: "30px",
            borderTop: "none",
            borderLeft: "none",
            borderRight: "none",
            backgroundColor: "transparent",
            outline: "none",
          }}
        />
        {isInvalid && <div style={{ color: "red" }}>Invalid OTP</div>}
      </div>
      <div>
        <button
          className="mt-4 btn btn-primary"
          type="button"
          onClick={handleSubmit}
        >
          Send OTP
        </button>
      </div>
    </div>
  );
};
export default OTPSignUp;
