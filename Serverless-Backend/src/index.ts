import { Hono } from "hono";
import { cors } from "hono/cors";
import userRoutes from "./routes/userRoutes";

const app = new Hono();

const corsOptions = {
  origin: ["https://ms-m-player.vercel.app", "https://ms-m-player.netlify.app", "http://localhost:5173"], // Your frontend URL
  credentials: true, // Allow credentials (cookies) to be sent
  allowMethods: ["POST", "GET"],
};

app.use(cors(corsOptions));

app.route("/", userRoutes)

export default app;
