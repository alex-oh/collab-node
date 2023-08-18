import mongoose from "mongoose";

const projectsSchema = new mongoose.Schema({
    
    name: {type: String, required: true, unique: false},

    description: {type: String, required: false},

    type: {type: String, required: true},

    completionPercentage: {
        type: Number,
        min: 0,
        max: 100,
        required: false
    },

    startDate: {type: Date, required: false},

    createDate: {type: Date, default: Date.now},

    projectOwner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',  // Assuming your user model is named 'User'
        required: true
    },

    classNumber: {type: String, required: false}

}, {collection: "Projects"});

export default projectsSchema;