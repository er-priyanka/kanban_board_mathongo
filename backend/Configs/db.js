require("dotenv").config();
const mongoose = require("mongoose");

const URL = process.env.MONGO_URL;


const connection = mongoose.connect(URL);

module.exports = {
    connection
};
