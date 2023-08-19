import mongoose, { mongo } from "mongoose";
import apisSchema from "./apis-schema";

const apisModel = mongoose.model("Apis", apisSchema);
export default apisModel;