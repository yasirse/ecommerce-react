// src/sendEmail.js
const nodemailer = require('nodemailer');
const dotenv = require('dotenv');
const crypto = require('crypto');
const { createUser,checkEmailExists,changePassword } = require('../model/userModel');
var jwt = require('jsonwebtoken');
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcrypt');
const User = require('../model/User');
// Load environment variables from .env file
dotenv.config();

//Login function 
 const login=async (req,res)=> {
    const { email, password } = req.body;
    console.log("login function request body",req.body);
  try {
    //const user = await checkUserExists(email, password);
    let userFound = await User.findOne({ email: email });
    console.log("check user exists after email");
    
    if (!userFound) {
        console.log("401 error Email Mismatch");
        res.status(401).json({ message: 'Invalid Email' });
    }
    // If user is found, compare the password with the hashed password
    else 
    {
      console.log("user password from mongodb=",userFound.password);
      const isHashTrue = await checkHash(password,userFound.password);
      if(isHashTrue)
      {
        const data = {user:{id:userFound.id}};
        const authToken = jwt.sign(data,process.env.JWT_SECRET);
        console.log("Token:",authToken);
        const sendUser = Object.defineProperty(userFound, "token", {value:authToken});
        console.log("200 Found");
        res.status(200).json(sendUser );
      }
      else{
        console.log("401 error Password Mis-match");
        res.status(401).json({ message: 'Invalid Passowrd' });
      }
    }
    
  } 
  catch (error) {
    console.log("Error",error);
    res.status(500).json({ message: 'Internal server error', error:error });
  }
}

// *** Sign Up Functon *** //
const signup = async (req, res) => 
{
    const { name,email, password } = req.body;
    // If there are errors in validation, return Bad request and the errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    try 
    {
        // Check if the email already exists
        console.log("Email Recived",email);
        let emailUser = await User.findOne({ email: req.body.email });
        //const emailUser = await checkEmailExists(email);
        console.log("after email checking",emailUser)
        if (emailUser) 
        {
            console.log("User Exists", emailUser);
            res.status(401).json({ message: 'Duplicate user' });
        }
        else
        {
            const data = {user:{email:email}};
            const token = await jwt.sign(data,process.env.JWT_SECRET);
            const hashedPassword = await hashPassword(password);
            //const user = await createUser(name,email, hashedPassword,token);
          let  user = await User.create({
              name: name,
              email: email,
              password: hashedPassword,
              token: token,
              
            })
            console.log("user data after insert from mongodb",user);
            //Generate OTP here
            const otp = await generateOTP();
            // send otp to user Email
            sendOTPEmail(email,otp);
            const sendUser = {name,email,otp,token};
            res.status(200).json(sendUser);   
    }
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: 'Internal server error'});
    }
  }
  //*Forgot Password email verification */
  const forgotPassword=async (req, res) => {
    const { email } = req.body;
    console.log("Received email:",email);
    try {
      //const user = await checkEmailExists(email);
      const user= await User.findOne({ email: email });
      if (user) 
      {
        //Generate OTP here
        const otp = await generateOTP();
        // send otp to user Email
        sendOTPEmail(email,otp);
        console.log("Email Result:",user);
        console.log("200 Found");
        res.status(200).json({otp:otp,user} );
      } 
      else 
      {
        console.log("401 error Email Mismatch");
        res.status(401).json({ message: 'Invalid Email' });
      }
    } 
    catch (error) {
      res.status(500).json({ message: 'Internal server error', error:error });
    }
  }
//***forgot password updation ***/
const resetPassword=async (req, res) => {
  const { email,password } = req.body;
  // If there are errors in validation, return Bad request and the errors
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  try { 
        const hashedPassword = await hashPassword(password);
        console.log("resetpassword email and hash before updation=",email,hashPassword);  
        //update the password based on email
        const user=await User.findOneAndUpdate({ email: email },{ $set: { password:hashedPassword} },{ new: true });
        console.log("affectedRows of update password=",user);
        if (user) 
        {
          console.log("200 Found");
          res.status(200).json({message:"Password Updated Successfuly"} );
        }
        else 
        {
          console.log("401 error Email Mismatch");
          res.status(401).json({ message: 'Error: try again' });
        }
      } 
  catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Error in password updating', error:error });
  }
}

// Create transporter object using SMTP transport
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
    }
});
// *** Send OTP EMAIL *** //
async function sendOTPEmail(email,otp) {
    try {
        // Email content
        const mailOptions = {
            from: process.env.EMAIL_USER,
            to: email,
            subject: 'Your OTP for Verification',
            text: `Your OTP is ${otp}. Please use this OTP to verify your email.`
        };

        // Send email
        const info = await transporter.sendMail(mailOptions);
        console.log('Email sent: ' + info.response);
    } catch (error) {
        console.error('Error sending email:', error);
    }
}


// OTP FUNCTION
function generateOTP() {
  return new Promise((resolve, reject) => {
    console.log("in generate OTP");
      crypto.randomBytes(3, function(err, buffer) {
      console.log("in generate OTP");
          if (err) {
              reject(err);
          } else {
              const otp = parseInt(buffer.toString('hex'), 16).toString().substr(0, 6);
              resolve(otp);
          }
      });
  });
}
//Compare Hash Function
async function checkHash(userPassword, hashPassword) {
    const match = await bcrypt.compare(userPassword, hashPassword);
    if(match)
      return true;
    else
      return false;
  }
  // Generate Hashed Password
  async function hashPassword(password) {
    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        // Store hashedPassword in your password DB
        return hashedPassword;
    } catch (err) {
        console.error('Error hashing password:', err);
        throw err; // Or handle the error as appropriate
    }
  }
  
// Function 'checkUserExists' verifies if the user exists
const checkUserExists = async(email, password) => {
    console.log("check user exists before email");
    //const userFound = await checkEmailExists(email);
    let userFound = await User.findOne({ email: email });
    console.log("check user exists after email");
    
    if (!userFound) {
      console.log("Email Mis-match");
      return null;
    }
    // If user is found, compare the password with the hashed password
    else 
    {
      console.log("user password from mongodb=",userFound.password);
      const isHashTrue = await checkHash(password,userFound.password);
      if(isHashTrue)
      {
        return {message:"passMatched", userFound};
      }
      else
        return {message:"nopassMatched"};
    }
  };

module.exports = {login,signup,generateOTP,sendOTPEmail,resetPassword,forgotPassword};
