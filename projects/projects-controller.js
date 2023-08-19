import * as ProjectsDAO from "./projects-dao.js";

export const createProject = async (req, res) => {
    try {
        const project = await create(req.body);
        res.status(201).json(project);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const projectsFeed = async (req, res) => {
    try {
        const projects = await findAll();
        res.json(projects);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const findProject = projectsFeed; 

export const coursesFeed = async (req, res) => {
    try {
        const courseId = req.params.courseId;
        const projects = await findOwnerId(courseId);
        res.json(projects);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const findCourseProject = coursesFeed; 

export const myProjects = async (req, res) => {
    try {
        const projectId = req.params.projectId;
        const project = await findById(projectId);
        res.json(project);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const findProjectById = myProjects; // find for my projects

export const updateProject = async (req, res) => {
    try {
        const projectId = req.params.projectId;
        const updatedProject = req.body;
        const result = await update(projectId, updatedProject);
        res.json(result);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const deleteProject = async (req, res) => {
    try {
        const projectId = req.params.projectId;
        const result = await deleteById(projectId);
        res.json(result);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};