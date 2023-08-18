import mongoose from "mongoose";

const projectsSchema = new mongoose.Schema({

    title: {type: String, required: true, unique: true},
    description: {type: String},
    user: {type: String, required: true, unique: true},
    contributors: {type: String, required: true, unique: true},
    createDate: {type: String },
    status: {type: String},
    priority: {type: String},
}, {collection: "users"});

export default projectsSchema;