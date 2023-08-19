import projectsModel from "./projects-model.js";

export const findAll = () => {
    return projectsModel.find();
}

export const findOwnerId = (ownerId) => {
    return projectsModel.find({ projectOwner: ownerId });
}

export const create = async (projectData) => {
    const project = new projectsModel(projectData);
    return await project.save();
}

export const update = async (pid, project) => {

    try {
        const result = await projectsModel.updateOne({_id: pid}, {$set: project});
        return user;
    } catch (e) {
        console.log("ERROR UPDATED PROJECT:", e);
    }
}

export const deleteById = async (id) => {
    projectsModel.deleteOne({_id});
    return {status: 'ok'};
}
