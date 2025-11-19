import express from "express";
import cors from "cors";
import routes from "./routes";
import { requestIdMiddleware } from "./middlewares/requestIdMiddleware";
import { errorHandler } from "./middlewares/errorHandler";

const app = express();
app.use(cors());
app.use(express.json());
app.use(requestIdMiddleware);

app.use("/auth", routes.auth);
app.use("/classes", routes.classes);
app.use("/assignments", routes.assignments);

app.use(errorHandler);

export default app;
