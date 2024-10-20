import { Hono } from "hono";
import authMiddlware from "../middlewares/authMiddleware";
import { login, logout, signup } from "../controllers/userController";

const userRoutes = new Hono();

userRoutes.get("/authenticate", authMiddlware);

userRoutes.post("/login", login);

userRoutes.post("/signup", signup);

userRoutes.get("/logout", logout);

export default userRoutes;