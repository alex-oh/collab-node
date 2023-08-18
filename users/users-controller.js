import * as userDao from "./users-dao.js";

const UserController = (app) => {
  app.post('/api/users', createUser);
  app.get('/api/users', findAllUsers);
  app.post('/api/users/multiple', getMultipleUsersByID);
};

// const getMultipleUsersById = async (req, res) => {
//     try {
//         const users = await userDao.getMultipleUsersById(req.body.userIds);
//         res.status(200).json(users);
//     } catch (error) {
//         console.error("Error fetching users:", error);
//         res.status(500).json({ error: error.message });
//     }
//     };

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

const getMultipleUsersByID = async (req, res) => {
  try {
    const userIds = req.body.ids; // Assuming the request body contains an 'ids' attribute with an array of user IDs
    if (!Array.isArray(userIds)) {
      return res.status(400).json({ error: 'Expected an array of user IDs' });
    }

    const users = await userDao.findUsersByIds(userIds);  // Assuming you have this method in userDao
    res.status(200).json(users);
  } catch (error) {
    console.error("Error fetching multiple users by IDs:", error); 
    res.status(500).json({ error: error.message });
  }
};

export default UserController;
