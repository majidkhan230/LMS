import userModel from "../models/userModel.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
const register = async (req, res) => {
  try {
    const { fullName, email, password } = req.body;
    if (!fullName || !email || !password) {
      res.status(200).json("All fields are required!");
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const compPassword = await bcrypt.compare(password, hashedPassword);
    console.log(compPassword);

    const token = jwt.sign(email, process.env.SECRET_KEY,{expiresIn:'1h'});
    console.log(token);

    const user = await userModel.create({
      fullName,
      email,
      password: hashedPassword,
    });

    if (!user) {
      res
        .status(400)
        .json({ message: "User registration faild please try again" });
    }

    res.cookie("token", token);

    //   console.log(jwt.verify(token,process.env.SECRET_KEY))

    res.status(201).json({
      message: "user sucessfully created!",
      user: user,
      token: token,
    });
  } catch (error) {
    res.status(400).send({
      message: "something went wrong with server",
      error: error.message,
    });
  }
};
const login = async (req, res) => {
  const {email,password} = req.body
  // console.log(input)
  
  const { token } = req.cookies;
  console.log(token);
  try {
    const verifyToken = jwt.verify(token, process.env.SECRET_KEY);

    if (!verifyToken && compPass) {
       res.status(401).send({
        message: "Unauthorized User",
      });

      res.status(200).send({
        message: "user successfully login!",
        error: error.message,
      });
    }
  } catch (error) {
    res.status(400).send({
      message: "something went wrong with server",
      error: error.message,
    });
  }
};
const logout = () => {};
const forgotPassword = () => {};

const userController = { register, login, logout, forgotPassword };

export default userController;
