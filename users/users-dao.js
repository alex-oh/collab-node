import usersModel from "./users-model.js";

export const findAllUsers = () => usersModel.find();

export const findUserById = (uid) => {
  return usersModel.findById(uid);
};

export const findUsersByIds = (uids) => {
  return usersModel.find({ _id: { $in: uids } });
};

export const findUserByUsername = (usernameToCheck) => {
  return usersModel.findOne({username: usernameToCheck});
};

export const findUserByCredentials = (usernameToCheck, passwordToCheck) => {
  return usersModel.findOne({ username: usernameToCheck, password: passwordToCheck })
};

export const createUser = async (user) => {
  return await usersModel.create(user);
};

export const updateUser = async (uid, user) => {
  try {
      const result = await usersModel.updateOne({ _id: uid }, { $set: user });
      return user;
  } catch (e) {
      console.log("ERROR UPDATING USER:", e);
  }
};

export const deleteUser = async (uid) => {
  await usersModel.deleteOne({ username: uid });
  return { status: 'ok' }
};

export const updateUserDescription = async (username, description) => {
  try {
    return await usersModel.updateOne({username}, {$set: {description}});
  } catch (e) {
    console.log("ERROR UPDATING: bio-info:", e);
  }
};

export const updateUserEmail = async (username, email) => {
  try {
    return await usersModel.updateOne({username}, {$set: {email}});
  }
  catch (e) {
    console.log("ERROR UPDATING: email:", e);
  }
}

export const updateUserPassword = async (username, password) => {
  try {
    return await usersModel.updateOne({username}, {$set: {password}});
  }
  catch (e) {
    console.log("ERROR UPDATING: password:", e);
  }
}


