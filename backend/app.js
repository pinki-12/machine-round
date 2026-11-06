import express from "express";
import cors from "cors"
import cookieParser from "cookie-parser";
import authRouter from "./routes/authRoutes.js"

const app = express();

app.use(express.json());
app.use(cors({
  origin: "http://localhost:5173",
  credentials: true
}));
app.use(cookieParser()); 

app.use("/api/auth",authRouter)

export default app;

