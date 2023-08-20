import * as projectsDao from "./projects-dao.js";

const ProjectsController = (app) => {
    app.post('/api/createProjects', createProject);
    app.get('/api/projects', getProjects);
    app.get('/api/projects/:projectId', getProjectById);
    // app.put('/api/projects/updateProjectId', updateProject);
    app.delete('/api/projects/projectId', deleteProject);

};

 const createProject = async (req, res) => {
    try {
        const project = await projectsDao.create(req.body);
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

const getProjectById = async (req, res) => {
  try {
    const project = await projectsDao.findById(req.params.projectId);
    res.json(project);
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
};

const findProjectById = async (req, res) => {
  try {
    const project = await findById(req.params.projectId);
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
    const result = await deleteById(projectId);
    res.json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export default ProjectsController;
