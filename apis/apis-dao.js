import apisModel from "./apis-model";

export const findAllApis = () => apisModel.find();

export const findApiByID = (aid) => {
    return apisModel.findById(aid);
}

export const findApisByIDs = (aid) => {
    return apisModel.findById({ _id: { $in: aid } })
}

export const createApi = (api) => {
    return apisModel.create(api);
}

export const updateApi = async (aid, api) => {
    try {
        const result = await apisModel.updateOne({_id: aid}, {$set: api});
        return api;

    } catch (e) {
        console.log("ERROR HANDLING THE API UPDATE:", e);
    }
}