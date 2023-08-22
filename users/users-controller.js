import * as userDao from "./users-dao.js";

const UsersController = (app) => {
    app.post("/api/users", createUser);
    app.get("/api/users", findAllUsers);
    app.get("/api/users/:uid", getUserById);
    app.post("/api/getMultipleUserById", getMultipleUsersByID);
    app.delete("/apis/users/:username", deleteUser);
    app.put("/api/users/:uid", updateUser);
    app.put("/api/users/:username/description", updateUserDescription);
    app.put("/api/user/:username/updateEmail", updateUserEmail);
    app.put("/api/user/:username/updatePassword", updateUserPassword);

};

const createUser = async (req, res) => {
    try {
        const newUser = await userDao.createUser(req.body);
        res.status(201).json(newUser);
    } catch (error) {
        console.error("Error creating user:", error);
        res.status(500).json({ error: error.message });
    }
};

const updateUser = async (req, res) => {
    const uid = req.params.uid;

    const updatedUser = await userDao.updateUser(uid, req.body);
    console.log(updatedUser);
    res.json(updatedUser);
};

const deleteUser = async (req, res) => {
    const uid = req.params.username;
    const status = await userDao.deleteUser(uid);
    res.json(status);
};

const findAllUsers = async (req, res) => {
    try {
        const users = await userDao.findAllUsers();
        res.status(200).json(users);
    } catch (error) {
        console.error("Error fetching users:", error);
        res.status(500).json({ error: error.message });
    }
};

const getUserById = async (req, res) => {
    try {
        const userId = req.params.uid;
        console.log("from controller",userId);
        const user = await userDao.findUserById(userId);
        res.status(200).json(user);
    } catch (error) {
        console.error("Error fetching user by ID", error);
        res.status(500).json({ error: error.message });
    }
};

const getMultipleUsersByID = async (req, res) => {
    try {
        const userIds = req.body.ids;
        if (!Array.isArray(userIds)) {
            return res
                .status(400)
                .json({ error: "Expected an array of user IDs" });
        }


        const users = await userDao.findUsersByIds(userIds);
        res.status(200).json(users);
    } catch (error) {
        console.error("Error fetching multiple users by IDs:", error);
        res.status(500).json({ error: error.message });
    }
};

const updateUserDescription = async (req, res) => {
    const username = req.params.username;
    const {description} = req.body;
  
    try {
      const status = await userDao.updateUserDescription(username, description);
      res.status(200).json({message: "bio-info Update successful"})
    } catch (error) {
      console.error("Error updating user description:", error);
      res.status(500).json({error: error.message});
    }
  }
  
  const updateUserEmail = async (req, res) => {
      const username = req.params.username;
      const {email} = req.body;
  
      try {
          const status = await userDao.updateUserEmail(username, email);
          res.status(200).json({message: "email Update successful"})
      } catch (error) {
          console.error("Error updating user email:", error);
          res.status(500).json({error: error.message});
      }
  }
  
  const updateUserPassword = async (req, res) => {
      const username = req.params.username;
      const {password} = req.body;
  
      try {
          const status = await userDao.updateUserPassword(username, password);
          res.status(200).json({message: "password Update successful"})
      } catch (error) {
          console.error("Error updating user password:", error);
          res.status(500).json({error: error.message});
      }
  }

  
export default UsersController;
