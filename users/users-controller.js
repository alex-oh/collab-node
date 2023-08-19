import * as userDao from "./users-dao.js";

const UserController = (app) => {
  app.post("/api/users", createUser);
  app.get("/api/users", findAllUsers);
  app.post("/api/users/multiple", getMultipleUsersByID);
  app.delete("/api/users/:uid", deleteUser);
  app.put("/api/users/:uid", updateUser);
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
   
    const updateUser = await userDao.updateUser(uid);
    res.status(200).json(updateUser);
};

const deleteUser = async (req, res) => {
    const uid = req.params.uid;
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

const getMultipleUsersByID = async (req, res) => {
  try {
    const userIds = req.body.ids;
    if (!Array.isArray(userIds)) {
      return res.status(400).json({ error: "Expected an array of user IDs" });
    }

    const users = await userDao.findUsersByIds(userIds);
    res.status(200).json(users);
  } catch (error) {
    console.error("Error fetching multiple users by IDs:", error);
    res.status(500).json({ error: error.message });
  }
};


export default UserController;
