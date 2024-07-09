const mongoose = require("mongoose");
require("dotenv").config();

URL = process.env.DATABASE_URL;

const dbConnect = () => {
    mongoose.connect(URL, {
        family: 4,
    })
    .then((db) => console.log("Database Connected"))
    .catch((err) => console.log("Error in connecting to database", err));
};

module.exports = dbConnect;
