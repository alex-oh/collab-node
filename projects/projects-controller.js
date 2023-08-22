import * as projectsDao from "./projects-dao.js";

const ProjectsController = (app) => {
    // Fixed Create Project Call
    app.post("/api/projects", createProject);
    app.get("/api/projects", getProjects);
    app.get("/api/my-projects/:uid", getMyProjects);
    app.get("/api/projects/:projectId", findProjectById);
    app.get("/api/course-projects/:courseId", findProjectByCourse)
    // app.put('/api/projects/updateProjectId', updateProject);
    app.delete("/api/projects/:projectId", deleteProject);
};

const createProject = async (req, res) => {
    try {
        const project = await projectsDao.create(req.body);
        console.log(project);
        res.status(201).json(project);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const getProjects = async (req, res) => {
    try {
        const projects = await projectsDao.findAll();
        res.json(projects);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const getMyProjects = async (req, res) => {
    try {
        const userId = req.params.uid;
        console.log("Request parameters from project-controllers:", req.params);
        const projects = await projectsDao.findOwnerId(req.params.uid);
        console.log("Projects from project-controllers:", projects.result);
        res.json(projects);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const findProjectByCourse = async (req, res) => {
    try {
        const courseId = req.params.courseId;
        const projects = await projectsDao.findByCourseId(courseId);
        console.log(projects);
        res.json(projects);
    } catch (error) {
        // res.status(500).json({ error: error.message });
        res.json(null);
    }
};

const findProjectById = async (req, res) => {
    try {
        const project = await projectsDao.findById(req.params.projectId);
        res.json(project);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// const updateProject = async (req, res) => {
//   try {
//     const projectId = req.params.projectId;
//     const updatedProject = req.body;
//     const result = await projectsDao.update(projectId, updatedProject);
//     res.json(result);

//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// };

const deleteProject = async (req, res) => {
    try {
        const projectId = req.params.projectId;
        const result = await projectsDao.deleteById(projectId);
        res.json(result);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export default ProjectsController;
