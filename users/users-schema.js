import mongoose from "mongoose";

const userSchema = new mongoose.Schema({

    username: { type: String, required: true, unique: true },

    password: { type: String, required: true },

    email: { type: String, required: true },
   
    projectsCreated: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Projects',
        required: false
    }],
    
    favoriteApis: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Apis',
        required: false
    }],

    accountType: {type: String, required: true},

    instructorCourses: {type: String},

    description: {type: String},
    
}, {collection: "Users"});

export default userSchema;


