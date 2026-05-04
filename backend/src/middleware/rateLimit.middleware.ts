import rateLimit from "express-rate-limit";

const authLimiter = rateLimit({
  windowMs: 15 * 60 * 100,
  max: 10,
  message: { success: false, message: "To many attempts, please try again later" },
});

const publicLimiter = rateLimit({
  windowMs: 10 * 60 * 100,
  max: 50,
  message: { success: false, message: "Too many requests, please try again later" },
});

export { authLimiter, publicLimiter };
