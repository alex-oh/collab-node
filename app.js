import mongoose from "mongoose";
import express from "express";
import cors from "cors";
import session from "express-session";
import UsersController from "./users/users-controller.js";
import ApisController from "./apis/apis-controller.js";
import ProjectsController from "./projects/projects-controller.js";
import AuthController from "./users/auth-controller.js";

const CONNECTION_STRING =
    "mongodb+srv://krugert:ZIFQQxbMj7zC7Pmp@neu-collab-0.1oel9h6.mongodb.net/";
const FRONTEND_URL = "http://localhost:3000";
const NODE_ENV = "development";

mongoose.connect(CONNECTION_STRING);

const app = express();

app.use(
    cors({
        credentials: true,
        origin: FRONTEND_URL,
    })
);

const sessionOptions = {
    secret: "your-secret-key", // Replace with your own secret key
    resave: false,
    saveUninitialized: false,
};
if (NODE_ENV !== "development") {
    sessionOptions.proxy = true;
    sessionOptions.cookie = {
        sameSite: "none",
        secure: true,
    };
}
app.use(session(sessionOptions));
app.use(express.json());

UsersController(app);
ProjectsController(app);
ApisController(app);
AuthController(app);

app.listen(4000, () => {
    console.log("Server is running on port 4000");
});
