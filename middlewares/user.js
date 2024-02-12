const { User } = require("../db/db");
const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("../config");
function userMiddleware(req, res, next) {
  const token = req.headers.authorization;
  const word = token.split(" ");
  const jwtToken = word[1];
  const decocdedValue = jwt.verify(jwtToken, JWT_SECRET);
  if (decocdedValue.username) {
    next();
  } else {
    res.status(403).json({ msg: "User is not authenticated" });
  }
}

module.exports = userMiddleware;
