const crypto = require("crypto");

const csrfMiddleware = (req, res, next) => {
  const TOKEN_SECRET = process.env.CSRF_SECRET || "my_very_secure_secret_key";

  const createCsrfToken = () => crypto.randomBytes(32).toString("hex");

  const hashToken = (token) =>
    crypto.createHmac("sha256", TOKEN_SECRET).update(token).digest("hex");

  if (req.method === "GET") {
    const csrfToken = createCsrfToken();
    const csrfTokenHash = hashToken(csrfToken);

    // Set only HttpOnly cookie with hashed token, no client-accessible cookie needed
    res.cookie("csrf_token", csrfTokenHash, {
      httpOnly: true,
      sameSite: "Strict", // or 'Lax' based on your need
      secure: process.env.NODE_ENV === "production",
      maxAge: 24 * 60 * 60 * 1000,
    });

    // Store the unhashed token in req for potential server validation use
    req.csrfToken = () => csrfToken;

    return next();
  }

  if (["POST", "PUT", "DELETE"].includes(req.method)) {
    const csrfTokenCookie = req.cookies["csrf_token"];

    if (!csrfTokenCookie) {
      return res.status(403).json({ error: "Missing CSRF token cookie" });
    }

    // Optionally, you may generate a new token per session or per request and compare hashes
    // But here we just check the presence of cookie with SameSite/HttpOnly for CSRF protection

    // If you want to be stricter, add session/session-secret based token validation here

    return next();
  }

  next();
};

module.exports = csrfMiddleware;
