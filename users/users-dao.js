import userModel from "./users-model";

export const findAllUsers = () => userModel.find();

export const findUserById = () => userModel.findById(uid);

export const createUser = (user) => {
  return userModel.create(user);
};

export const updateUser = async (uid, user) => {
  usersModel.updateOne({ _id: uid }, { $set: user });
};

export const createProject = (project) => {
    return projectModel.create(project);
    
}
