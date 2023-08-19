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
  console.log("Testing Create User");
  console.log(user);
  return  await usersModel.create(user);
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

