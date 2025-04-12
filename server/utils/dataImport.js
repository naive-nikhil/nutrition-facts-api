const mongoose = require('mongoose');
const Food = require('../models/Food');
const connectDB = require('../config/db');
require('dotenv').config();

const foodData = require('../../data/glycemicIndex.json');

const importData = async()=>{
    try {
        await connectDB();
        console.log("Clearing previous data...")
        await Food.deleteMany({});
        await Food.insertMany(foodData);
        console.log("Data imported successfully");
        process.exit();
    } catch (error) {
        console.log(`Error: ${error.message}`)
        process.exit(1);
    }
};

importData();