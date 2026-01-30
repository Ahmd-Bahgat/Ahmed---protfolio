import rateLimit from "express-rate-limit";

export const contactLimiter = rateLimit({
  windowMs: 60 * 60 * 1000,
  limit: 5,
  message: {
    success: false,
    error: "Email sending limit exceeded for today, please try again tomorrow.",
  },
});
