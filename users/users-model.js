import mongoose from "mongoose";
import userSchema from "./users-schema";
const userModel = mongoose.model("users", userSchema);
export default userModel;