import mongoose, { mongo } from "mongoose";
import projectsSchema from "./projects-schema.js";

const projectsModel = mongoose.model("Projects", projectsSchema);
export default projectsModel;

