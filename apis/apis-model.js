import mongoose, { mongo } from "mongoose";
import apisSchema from "./apis-schema.js";

const apisModel = mongoose.model("Apis", apisSchema);
export default apisModel;