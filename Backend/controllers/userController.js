import userModel from "../models/userModel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import crypto from "crypto";
import { resetMail } from "../mailtrap/email.js";
import { log } from "console";

// generate auth token
const generateAuthToken = async function (email) {
  const token = await jwt.sign(email, process.env.SECRET_KEY);
  return token;
};

// hashPassword
const hashPassword = async function (password) {
  return await bcrypt.hash(password, 10);
};

//compare password
const comparePassword = async function (plainPassword, hashedPassword) {
  return await bcrypt.compare(plainPassword, hashedPassword);
};

const register = async (req, res) => {
  const { fullName, email, password } = req.body;

  if (!fullName || !email || !password) {
    return res.status(400).json({ message: "All fields are required" });
  }

  const isUserExist = await userModel.findOne({ email });

  // console.log(isUserExist)

  if (isUserExist) {
    return res.status(409).json({ message: "User already exists" });
  }

  const hashedPassword = await hashPassword(password);
  const token = await generateAuthToken(email);
  const user = await userModel.create({
    fullName,
    email,
    password: hashedPassword,
  });

  try {
    res.status(201).json({ message: "User created successfully", user, token });
  } catch (error) {
    res.status(404).send({
      message: "something went wrong",
      error: error.message,
    });
  }
};

const login = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ message: "All fields are required" });
  }
  const user = await userModel.findOne({ email });
  if (!user) {
    return res.status(401).json({ message: "Invalid credentials" });
  }
  const isPasswordValid = await comparePassword(password, user.password);
  if (!isPasswordValid) {
    return res.status(400).json({ message: "Invalid credentials" });
  }
  const token = await generateAuthToken(email);
  try {
    res.cookie("token", token);
    res.json({ message: "Logged in successfully", user, token });
  } catch (error) {
    res
      .status(403)
      .json({
        message: "something went wrong with server",
        error: error.message,
      });
  }
};

const getUserProfile = (req, res, next) => {
  res.status(200).json(req.user);
};

const logout = (req, res) => {
  res.clearCookie("token");
  res.json({ message: "Logged out successfully" });
};

const forgotPassword = async (req, res) => {
  try {
    const email = req.body.email;

    if (!email) {
      return res.status(400).json({ message: "Email field is required" });
    }

    const user = await userModel.findOne({ email });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const token = crypto.randomBytes(20).toString("hex");
    console.log(token);

    user.resetPasswordToken = token;

    await user.save();
    await resetMail(email,`http://localhost:5173/reset/${token}`);
    res.status(200).send("email send successfully");


  } catch (error) {
    res.status(400).send({
      message: "something went wrong",
      error: error.message,
    });
  }
};

const resetPassword = async(req,res)=>{
  console.log('reset password clicked')
  
  const password = req.body.password;
  console.log(password)
  const token = req.params.token
  console.log(token)
try {
  const user  = await userModel.findOne({resetPasswordToken : token})
  console.log(user)
  if(!user){
    return res.status(404).json({ message: "invalid token or expired" })
  }
  const hashPassword = await bcrypt.hash(password,10)

  user.password = hashPassword
  user.resetPasswordToken = undefined;
  await user.save()
  res.status(200).json({ message: "password reset successfully",
  })
  
} catch (error) {
  res.status(400).send({
    message: "something went wrong",
    error: error.message,
  });
}
}


// const forgotPassword = async(req, res) => {
//   // const {fullName, email,password} = req.body
//   // console.log(fullName,email ,password)
//   // res.status(200).json(req.user)
//   // console.log(req.user._id)

//   const user = await userModel.findOne({ _id: req.user._id})
//   // console.log(user)

//   if(!user){
//     return res.status(404).json({ message: "User not found" })
//   }

//   // const newPassword = Math.random().toString(36).substr(2, 10);
//   const hashedPassword = await hashPassword(req.body.password);

//   if(user){
//     user.password = hashedPassword || user.password
//    const updatedUser =  await user.save()
//     res.status(200).json(
//       { message: "Password reset successfully", user: updatedUser }
//     )
//   }

// };

const userController = {
  register,
  login,
  getUserProfile,
  logout,
  forgotPassword,
  resetPassword
};

export default userController;
