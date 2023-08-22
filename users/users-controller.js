import * as userDao from "./users-dao.js";

const UsersController = (app) => {
    app.post("/api/users", createUser);
    app.get("/api/users", findAllUsers);
    app.get("/api/users/:uid", getUserById);
    app.post("/api/getMultipleUserById", getMultipleUsersByID);
    app.delete("/apis/users/:username", deleteUser);
    app.put("/api/users/:uid", updateUser);
    app.put("/api/users/:username/description", updateUserDescription);
    app.put("/api/users/:uid/favorite", addFavoriteApiToUser);  // <-- Added this line

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
    res.json(status);
  } catch (error) {
    console.error("Error updating user description:", error);
    res.status(500).json({error: error.message});
  }
};

const addFavoriteApiToUser = async (req, res) => {
    const userId = req.params.uid;
    const apiId = req.body.apiId;

    if (!apiId) {
        return res.status(400).json({ error: "API ID is required in the request body." });
    }

    try {
        const response = await userDao.updateUserWithFavoritesAPI(userId, apiId);
        if (response.status === 'ok') {
            res.status(200).json({ message: "Successfully added the API to favorites" });
        } else {
            throw new Error(response.message);
        }
    } catch (error) {
        console.error("Error adding favorite API to user:", error);
        res.status(500).json({ error: error.message });
    }
};

export default UsersController;