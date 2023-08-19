import express from "express";
import * as userDao from "./users-dao.js";

const AuthController = (app) => {
  app.post('/api/register', registerUser);
  app.post('/api/login', loginUser);
  app.post('/api/logout', logoutUser);
};

const registerUser = async (req, res) => {
  try {
    const { username, password, email } = req.body;
    
    // Check if user already exists
    const existingUser = await userDao.findUserByUsername(username);
    if (existingUser) {
      return res.status(400).json({ error: "Username already exists" });
    }
    
    const newUser = {
      username,
      password: hashedPassword,
      email,
      accountType: "user" 
    };
    
    await userDao.createUser(newUser);
    res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    console.error("Error registering user:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const loginUser = async (req, res) => {
  try {
    const { username, password } = req.body;
    
    // Find the user by username
    const user = await userDao.findUserByUsername(username);
    if (!user) {
      return res.status(401).json({ error: "Invalid username or password" });
    }
    
    // Compare passwords
    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      return res.status(401).json({ error: "Invalid username or password" });
    }
    
    // Store user information in session
    req.session.user = user;
    
    res.status(200).json({ message: "Login successful", user });
  } catch (error) {
    console.error("Error logging in:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const logoutUser = (req, res) => {
  // log out user session
  req.session.destroy();
  res.status(200).json({ message: "Logout successful" });
};
    
export default AuthController;
