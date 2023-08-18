import * as userDao from "./users-dao.js";

const UserController = (app) => {
  app.post('/api/users', createUser);
  app.get('/api/users', findAllUsers);
};

const createUser = async (req, res) => {
  try {
    const newUser = await userDao.createUser(req.body);
    res.status(201).json(newUser); // Set status to 201 (Created)
  } catch (error) {
    console.error("Error creating user:", error); // Log the error for debugging
    res.status(500).json({ error: error.message }); // Send a 500 Internal Server Error with the error message
  }
};

const findAllUsers = async (req, res) => {
  try {
    const users = await userDao.findAllUsers();  // Assuming you have this method in userDao
    res.status(200).json(users); // Send a 200 OK status with the list of users
  } catch (error) {
    console.error("Error fetching users:", error); // Log the error for debugging
    res.status(500).json({ error: error.message }); // Send a 500 Internal Server Error with the error message
  }
};

export default UserController;
