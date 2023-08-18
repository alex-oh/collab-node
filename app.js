

import express from "express"; //import express library
import cors from "cors"; //import cors library
import HelloController from "./controllers/hello-controller.js";
import UserController from "./users/users-controller.js";

const app = express(); //create an express library
app.use(cors()); //use cors library
HelloController(app); //call the HelloController function and pass in the app object
UserController(app); //call the UserController function and pass in the app object
app.listen(4001);
