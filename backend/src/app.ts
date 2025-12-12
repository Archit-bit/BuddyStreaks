import express from "express";
import cors from "cors";
import "dotenv/config";
import healthRouter from "./routes/health.routes.js";
import usersRouter from "./routes/users.routes.js";
import streaksRouter from "./routes/streaks.routes.js";

const app = express();

app.use(cors());
app.use(express.json());

app.use("/health", healthRouter);
app.use("/users", usersRouter);
app.use("/streaks", streaksRouter);

export default app;
