import apisModel from "./apis-model.js";

export const findAllApis = () => apisModel.find();

export const findApiByID = (aid) => {
    return apisModel.findById(aid);
};

export const findApiByName = (name) => {
    return apisModel.findOne({ title: name });
};

export const findApisByIDs = async (apiIds) => {
    try {
        return await apisModel.find({ _id: { $in: apiIds } });
    } catch (e) {
        console.error("Error fetching multiple APIs by IDs:", e);
    }
};

export const createApi = (api) => {
    return apisModel.create(api);
};

export const updateApi = async (aid, api) => {

    try {
        const result = await apisModel.updateOne({ _id: aid }, { $set: api }, { new: true });

        if (result.nModified === 0) {
            return null; 
        }

        return result; 

    } catch (e) {
        console.log("ERROR HANDLING THE API UPDATE:", e);
        throw e; 
    }
};

export const addUserToApiFavorites = async (apiId, userId) => {
    try {
        return await apisModel.findByIdAndUpdate(
            apiId, 
            { $addToSet: { userFavorites: userId } }, 
            { new: true }
        );
    } catch (e) {
        console.error("Error adding user to API favorites:", e);
        throw e;
    }
};