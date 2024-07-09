const express = require("express");
const dbConnect = require("./config/database");
const userRoutes = require("./routes/userRoutes");
const app = express();
const cors = require("cors");
require("dotenv").config();
const cookieParser = require("cookie-parser");

const corsOptions = {
    origin: 'https://ms-m-player.vercel.app', // Your frontend URL
    methods: ['GET', 'POST'],
    credentials: true, // Allow credentials (cookies) to be sent
    allowedHeaders: ['Content-Type', 'Authorization'],
};

app.use(cors(corsOptions));

app.use(express.json());
app.use(cookieParser());

app.use("/", userRoutes);

const PORT = process.env.PORT;

dbConnect();

const server = app.listen(PORT, () => {
    console.log("Server Up and Running at port", server.address().port);
})