import express from "express";
import * as userDao from "./users-dao.js";
import bcrypt from "bcryptjs";
import usersModel from "./users-model.js";

const AuthController = (app) => {
  app.post('/api/users/register', registerUser);
  app.post('/api/users/login', loginUser);
  app.post('/api/users/logout', logoutUser);
  app.post('/api/users/profile', profile);
  app.put('/api/users', update);
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
      return res.status(401).json({ error: "Invalid username " });
    }
    
    // Compare passwords
    const passwordMatch = await usersModel.findOne({ username: username, password: password });
    if (!passwordMatch) {
      return res.status(401).json({ error: "Invalid password" });
    }
    console.log("User:", user);

    // Store user information in session
    // req.session.user = user;
    if(user && passwordMatch){
        req.session.user = user;

        res.status(200).json({ message: "Login successful", user });

    }
    
  } catch (error) {
    console.error("Error logging in:", error);
    res.status(500).json({ error: "InternaServerl  Error" });
  }
};

const logoutUser = (req, res) => {
  // log out user session
  req.session.destroy();
  res.status(200).json({ message: "Logout successful" });
};

const profile = async (req, res) => {
    try {
        const user = req.session.user;
        if (!user) {
        return res.status(401).json({ error: "Not logged in" });
        }
        
        res.status(200).json({ message: "Profile retrieved successfully", user });
    } catch (error) {
        console.error("Error getting profile:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
    }

const update = async (req, res) => {
    userDao.updateUser(req.body);
    res.status(200).json({ message: "Update successful" });
}
    
export default AuthController;

