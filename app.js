import mongoose from "mongoose";
import express from "express";
import cors from "cors";
import session from "express-session";
import UserController from "./users/users-controller.js";
import ApiController from "./apis/api-controller.js";
import ProjectsController from "./projects/projects-controller.js";


const CONNECTION_STRING = "mongodb+srv://krugert:ZIFQQxbMj7zC7Pmp@neu-collab-0.1oel9h6.mongodb.net/";

mongoose.connect(CONNECTION_STRING);


const app = express();

app.use(
    cors()
);

app.use(express.json());

UserController(app);
ApiController(app);
ProjectsController(app);



app.listen(4000, () => {
    console.log("Server is running on port 4000");
});
