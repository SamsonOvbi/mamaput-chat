const rateLimit = require('express-rate-limit');

// Define the rate limit rule
const appRateLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 400, // Limit each IP to 400 requests per windowMs
  message: "Too many requests from this IP, please try again after 15 minutes.",
  statusCode: 429, // Status code to send when rate limit is exceeded
  headers: true, // Send custom rate limit headers with limit and remaining
});

module.exports = { appRateLimiter };