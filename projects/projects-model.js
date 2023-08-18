import mongoose from "mongoose";
import projectSchema from "./projects-schema";
import projectsSchema from "./projects-schema";
const userModel = mongoose.model("projects", projectsSchema);
export default projectModel;