const express = require("express");
const { signup, login, logout } = require("../controllers/userController");
const { authMiddlware } = require("../Middlewares/authMiddleware");
const userRoutes = express.Router();

userRoutes.get("/authenticate", authMiddlware);

userRoutes.post("/login", login);

userRoutes.post("/signup", signup);

userRoutes.get("/logout", logout);

module.exports = userRoutes;