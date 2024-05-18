import jwt from "jsonwebtoken";
function verifyToken(req, res, next) {
  const token = req.cookies["token"];
  if (!token) return res.status(401).json({ error: "Access denied" });
  try {
    const decoded = jwt.verify(token, process.env.SecretKey);
    req.userId = decoded.userId;
    next();
  } catch (error) {
    res.status(401).json({ error: "Invalid token" });
  }
}
export default verifyToken;
