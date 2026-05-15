import rateLimit from "express-rate-limit";

const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 10,
  message: { success: false, message: "Too many attempts, please try again later" },
});

const publicLimiter = rateLimit({
  windowMs: 10 * 60 * 1000,
  max: 50,
  message: { success: false, message: "Too many requests, please try again later" },
});

export { authLimiter, publicLimiter };
