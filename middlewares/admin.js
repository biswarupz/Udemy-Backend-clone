const { Admin } = require("../db/db");
const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("../config");

function adminMiddleware(req, res, next) {
  const token = req.headers.authorization;
  const word = token.split(" ");
  const jwtToken = word[1];
  try {
    const decocdedValue = jwt.verify(jwtToken, JWT_SECRET);
    if (decocdedValue.username) {
      req.username = decocdedValue.username;
      next();
    } else {
      res.status(403).json({ msg: "Admin is not authenticated" });
    }
  } catch (error) {
    res.json({ msg: "invalid login inputs" });
  }
}

module.exports = adminMiddleware;
