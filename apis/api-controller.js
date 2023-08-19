import * as apisDao from "./apis-dao.js";

const ApiController = (app) => {
    app.post('/api/apis', createApi);
    app.get('/api/apis', findAllApis);
    app.get('/api/apis:aid', getApiByID);
    app.post('/api/apis/multiple', getMultipleApisByID);
    app.put('/api/apis/:aid', updateApi);
};


const createApi = async (req, res) => {

    try {
        const newApi = await apisDao.createUser(req.body);
        res.status(201).json(newUser);
    } catch (error) {
        console.error("Error creating API:", error);
        res.status(500).json({ error: error.message });
    }
};

const findAllApis = async (req, res) => {

    try {
        const apis = await apisDao.findAllApis();
        res.status(200).json(apis);
    } catch (error) {
        console.error("Error fetching users:", error);
        res.status(500).json({ error: error.message });
    }


}

const getApiByID = async (req, res) => {

    try {
        const apiId = req.params.aid;
        const api = await apisDao.findApiById(apiId);
        
        if (!api) {
            return res.status(404).json({ error: 'API not found' });
        }

        res.status(200).json(api);
    } catch (error) {
        console.error("Error fetching API by ID:", error);
        res.status(500).json({ error: error.message });
    }

};


const getMultipleApisByID = async (req, res) => {

    try {
        const apiIds = req.body.ids;
        if (!Array.isArray(apiIds)) {
            return res.status(400).json({ error: 'Expected an array of API IDs' });
        }

        const apis = await apisDao.findApisByIDs(apiIds);
        res.status(200).json(users);
    } catch (error) {
        console.error("Error fetching multiple APIs by IDs:", error);
        res.status(500).json({ error: error.message });
    }
};

const updateApi = async (req, res) => {

    try {
        const apiId = req.params.aid;
        const updatedApiDetails = req.body;

        const updatedApi = await apisDao.updateApi(apiId, updatedApiDetails);

        if (!updatedApi) {
            return res.status(404).json({ error: 'API not found' });
        }

        res.status(200).json(updatedApi);
    } catch (error) {
        console.error("Error updating API:", error);
        res.status(500).json({ error: error.message });
    }
};


