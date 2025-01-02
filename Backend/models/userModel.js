import mongoose, { Schema } from "mongoose";

const userSchema = new Schema(
  {
    fullName: {
      type: String,
    },
    email: {
      type: String,
    },
    password: {
      type: String,
    },
    resetPasswordToken:{
      type: String,
      expires: Date.now() + 1 * 60 * 60 * 1000
    }
  },
  { timestamps: true }
);



const userModel  = mongoose.model("User",userSchema)
export default userModel;