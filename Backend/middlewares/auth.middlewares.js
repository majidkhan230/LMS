import jwt from "jsonwebtoken";
import userModel from "../models/userModel.js";

const authUser = async (req, res, next) => {
  const token = req.cookies.token || req.headers.authorization?.split(" ")[1];

  if (!token) {
      return res.status(401).json({ message: "unauthorized access" });
}
    

  try {
    const decoded = await jwt.verify(token, process.env.SECRET_KEY);
    // console.log(decoded)
    const user = await userModel.findOne({ email: decoded});
    // console.log(user)
    req.user = user;
    return next();
  } catch (error) {
    res
      .status(401)
      .json({ message: "Unauthorized user", error: error.message });
  }
};

const authMiddleware = {authUser}


export default authMiddleware;