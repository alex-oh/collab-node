import mongoose from "mongoose";

const apisSchema = new mongoose.Schema({

    title: {type: String, required: true, unique: false},

    category: {type: String, required: false},

    link: {type: String, required: false},

    description: {type: String, required: false},

    userFavorites: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Users',
        required: false
    }],

}, {collection: "Apis"});

export default apisSchema;