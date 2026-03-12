import express, { Application, Request, Response } from "express";
import cors from "cors";
import authRoutes from "./routes/authRoutes";
import challengeRoutes from "./routes/challengeRoutes";
import logRoutes from "./routes/logRoutes";
import publicRoutes from "./routes/publicRoutes";

const app: Application = express();

app.use(cors({ origin: "http://localhost:5174" }));
app.use(express.json());

app.use("/auth", authRoutes);
app.use("/challenges", challengeRoutes);
app.use("/logs", logRoutes);
app.use("/public", publicRoutes);

app.get("/health", (_req: Request, res: Response) => {
	res.status(200).json({ status: "ok" });
});

export default app;
