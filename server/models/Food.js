const mongoose = require("mongoose");

const foodSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true,
        index: true,
    },
    glycemicIndex:{
        type: Number,
        required: true,
        index: true,
    },
    category:{
        type: String,
        index: true,
    },
    servingSize:{
        type: String,
    },
    description:{
        type: String,
    },
    imageUrl:{
        type: String,
    },
},{timestamps: true});

foodSchema.index({name: 'text', description: 'text'});

module.exports = mongoose.model('Food', foodSchema);
