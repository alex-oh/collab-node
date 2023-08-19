import * as userDao from "./users-dao.js";

const UsersController = (app) => {
  app.post('/api/users', createUser);
  app.get('/api/users', findAllUsers);
  app.post('/api/users/multiple', getMultipleUsersByID);
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
      return res.status(400).json({ error: 'Expected an array of user IDs' });
    }

    const users = await userDao.findUsersByIds(userIds);
    res.status(200).json(users);
  } catch (error) {
    console.error("Error fetching multiple users by IDs:", error); 
    res.status(500).json({ error: error.message });
  }
};

export default UsersController;
