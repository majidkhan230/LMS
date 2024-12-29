import userModel from "../models/userModel.js";
import bcrypt from "bcrypt";
import jwt from 'jsonwebtoken'



// generate auth token
const generateAuthToken = async function(email){
  const token = await jwt.sign(email,process.env.SECRET_KEY)
  return token
} 

// hashPassword
const hashPassword = async function(password){
  return await bcrypt.hash(password,10)
}

//compare password
const comparePassword = async function(plainPassword, hashedPassword){
  return await bcrypt.compare(plainPassword, hashedPassword)
}



const register = async (req, res) => {
  const { fullName, email, password } = req.body;

  if (!fullName || !email || !password) {
    return res.status(400).json({ message: "All fields are required" });
  }

  const isUserExist = await userModel.findOne({ email });

  // console.log(isUserExist)

  if (isUserExist) {
    return  res.status(400).json({ message: "User already exists" });
  }

  const hashedPassword = await hashPassword(password);

  const user = await userModel.create({
    fullName,
    email,
    password: hashedPassword,
  });

  try {
    res.status(200).json({ message: "User created successfully", user });
  } catch (error) {
    res.status(404).send({
      message: "something went wrong",
      error: error.message,
    });
  }
};
const login = (req, res) => {};
const logout = (req, res) => {};
const forgotPassword = (req, res) => {};

const userController = { register, login, logout, forgotPassword };

export default userController;
