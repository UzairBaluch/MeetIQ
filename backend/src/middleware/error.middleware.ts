import { type NextFunction, type Request, type Response } from "express";
import { ZodError } from "zod";

import { ApiError } from "../utils/apiError.js";
import { logger } from "../utils/logger.js";

const notFoundHandler = (req: Request, _res: Response, next: NextFunction): void => {
  next(new ApiError(404, `Route not found: ${req.method} ${req.originalUrl}`));
};

const errorHandler = (err: unknown, req: Request, res: Response, _next: NextFunction): void => {
  if (err instanceof ZodError) {
    res.status(400).json({
      success: false,
      message: "Validation failed",
      errors: err.issues.map((issue) => `${issue.path.join(".")}: ${issue.message}`),
    });
    return;
  }

  if (err instanceof ApiError) {
    res.status(err.statusCode).json({
      success: false,
      message: err.message,
      errors: err.errors,
    });
    return;
  }

  logger.error("Unhandled error", { err, requestId: req.id });
  res.status(500).json({
    success: false,
    message: "Internal server error",
  });
};

export { errorHandler, notFoundHandler };
