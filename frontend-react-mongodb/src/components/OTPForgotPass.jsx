/**
 * OTP input for forgot-password flow — validates and routes to set-password.
 * Props/state: expects `location.state` with server OTP and user info.
 */
import { useState } from "react";
import OtpInput from "react-otp-input";
import { Navigate, useLocation, useNavigate } from "react-router-dom";
const apiUrl = import.meta.env.VITE_APP_API_URL;

const OTPForgotPass = () => {
  const [otp, setOtp] = useState("");
  const navigate = useNavigate();
  const [isInvalid, setIsInvalid] = useState(false);
  const location = useLocation();
  const server_res = location.state || null; // {otp, user: {id, name,email, password, token}}
  if (!server_res) {
    //console.log(server_res);
    return <Navigate to="/sign-in" />;
  }
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

  // This function is checking the user entered OTP
  const handleSubmit = () => {
    if (otp.length === 6 && /^[0-9]{6}$/.test(otp)) {
      // OTP is valid, proceed with submission
      setIsInvalid(false);
      if (otp === server_res.otp) {
        //console.log("OTP matched");
        navigate("/set-password", { state: server_res });
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
export default OTPForgotPass;
