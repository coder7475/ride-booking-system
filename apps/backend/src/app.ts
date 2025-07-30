import indexRouter from "@/routes";
import { mongoConnector } from "@repo/db";
import cors from "cors";
import express, { type Express } from "express";
import helmet from "helmet";

import { env } from "./configs/envConfig";
import { middlewares } from "./middlewares";

const app: Express = express();

// Connect to Database
mongoConnector(env.DB_URI as string).catch((err: Error) => console.error(err));

// Middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(helmet());

app.use("/api/v1", indexRouter);
app.use("/", (_req, res) => {
  return res.status(200).json({
    message: "Welcome to Ride Sharing System!",
  });
});

// Not found route handler
app.use(middlewares.notFoundRoute);
// Global error handler
app.use(middlewares.globalErrorHandler);

export default app;
