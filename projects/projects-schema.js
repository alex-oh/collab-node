import mongoose from "mongoose";

const projectsSchema = new mongoose.Schema({
    
    name: {type: String, required: true, unique: false},

    description: {type: String, required: false},

    seekingMembers: {type: String},

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
        ref: 'Users',  // Assuming your user model is named 'User'
        required: false,
        default: null
    },

    classNumber: {type: String, required: false}

}, {collection: "Projects"});

export default projectsSchema;
