import * as ProjectsDAO from "./projects-dao.js";

const ProjectsController = (app) => {
    app.post('/api/projects', createProject);
    app.get('/api/projects', projectsFeed);
    app.get('/api/projects/courseId', coursesFeed);
    app.get('/api/projects/projectId', myProjects);
    app.put('/api/projects/projectId', updateProject);
    app.delete('/api/projects/projectId', deleteProject);
};

 const createProject = async (req, res) => {
    try {
        const project = await create(req.body);
        res.status(201).json(project);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

 const projectsFeed = async (req, res) => {
    try {
        const projects = await findAll();
        res.json(projects);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

 const findProject = async (req, res) => {
    try {
        const projectId = req.params.projectId;
        const project = await findById(projectId);
        res.json(project);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
} 

 const coursesFeed = async (req, res) => {
    try {
        const courseId = req.params.courseId;
        const projects = await findOwnerId(courseId);
        res.json(projects);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

 const findCourseProject = async (req, res) => {
    try {
        const courseId = req.params.courseId;
        const project = await findOwnerId(courseId);
        res.json(project);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

 const myProjects = async (req, res) => {
    try {
        const projectId = req.params.projectId;
        const project = await findById(projectId);
        res.json(project);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

 const findProjectById = async (req, res) => {
    try {
        const projectId = req.params.projectId;
        const project = await findById(projectId);
        res.json(project);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

const updateProject = async (req, res) => {
    try {
        const projectId = req.params.projectId;
        const updatedProject = req.body;
        const result = await update(projectId, updatedProject);
        res.json(result);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

 const deleteProject = async (req, res) => {
    try {
        const projectId = req.params.projectId;
        const result = await deleteById(projectId);
        res.json(result);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};