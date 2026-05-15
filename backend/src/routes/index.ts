import { Router } from "express";

import { publicLimiter } from "../middleware/rateLimit.middleware.js";
import { healthRouter } from "./health.routes.js";

const apiRouter = Router();

apiRouter.use(publicLimiter);
apiRouter.use("/health", healthRouter);

export default apiRouter;
