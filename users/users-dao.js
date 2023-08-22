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

export const updateUserWithFavoritesAPI = async (userId, apiId) => { 

  console.log(apiId);

  try {
      const result = await usersModel.updateOne(
        
          { _id: userId }, 
          { $push: { favoriteApis: apiId } }
          
      );
      return { status: 'ok' };
  } catch (e) {
      console.log("ERROR UPDATING USER'S FAVORITE APIs:", e);
      return { status: 'error', message: e.message };
  }
  
};


