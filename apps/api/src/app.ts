import express from "express";
import cors from "cors";
import helmet from "helmet";
import createError from "http-errors";
import cookieParser from "cookie-parser";
import logger from "morgan";
import actuator from "express-actuator";
import { env } from "./config/env";
import { MainRouter } from "./routes";
import path from "path";

const app = express();

app.use(helmet());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());

const logMode = env.NODE_ENV === "development" ? "dev" : "combined";
app.use(logger(logMode));

app.use(cors());
app.use("/", MainRouter);
app.use("/uploads", express.static(path.resolve(__dirname, "./uploads")));

/**
 * Exposes /status/health, /status/info, /status/metrics
 */
app.use(actuator({ basePath: "/status" }));

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

export default app;
