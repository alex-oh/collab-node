import projectsModel from "./projects-model.js";

export const findAll = () => {
    return projectsModel.find();
}

export const findById = (pid) => {
    return projectsModel.findOne({_id: pid});
}

export const findOwnerId = (ownerId) => {
    return projectsModel.find({ projectOwner: ownerId });
}

export const findByCourseId = (courseId) => {
    return projectsModel.find({classNumber: courseId});
}

export const create = async (projectData) => {
    const project = new projectsModel(projectData);
    console.log(projectData);
    return await project.save();
}

export const update = async (pid, project) => {

    try {
        const result = await projectsModel.updateOne({_id: pid}, {$set: project});
        console.log(result);
        return project;
    } catch (e) {
        console.log("ERROR UPDATED PROJECT:", e);
    }
}

export const deleteById = async (id) => {
    const result = await projectsModel.deleteOne({_id: id});
    console.log(result);
    return id;
}