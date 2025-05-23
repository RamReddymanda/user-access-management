const jwt = require("jsonwebtoken");
//this is a middleware function that checks if the user is authenticated or not 
const authMiddleware = (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) return res.status(401).json({ message: "No token provided" });
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (err) {
    res.status(403).json({ message: "Invalid token" });
  }
};
//this is a middleware function that checks if the user has the required role to access the route
const roleMiddleware = (roles) => (req, res, next) => {
  if (!roles.includes(req.user.role)) return res.status(403).json({ message: "Access denied" });
  next();
};

module.exports = { authMiddleware, roleMiddleware };