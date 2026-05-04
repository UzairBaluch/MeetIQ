import rateLimit from "express-rate-limit";

const authLimiter = rateLimit({
  windowMs: 15 * 60 * 100,
  max: 10,
  message: { success: false, message: "To many attempts, please try again later" },
});

export { authLimiter };
