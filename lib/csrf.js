const csrf = require("csurf");
require("dotenv").config();

const csrfProtection = csrf({
  cookie: {
    maxAge: 60 * 60 * 24, // 1 day
    secure: process.env.NODE_ENV === "production",
    httpOnly: true,
  },
});

const attachCSRF = (req, res, next) => {
  if (!req.cookies["XSRF-TOKEN"]) {
    console.log("req.csrfToken exists?", typeof req.csrfToken);
    res.cookie("XSRF-TOKEN", req.csrfToken());
  }
  next();
};

module.exports = {
  csrfMiddleware: [csrfProtection, attachCSRF],
};
