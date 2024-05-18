// routes/protectedRoute.js

import router from "./auth.js";
import express from "express";
import verifyToken from "../middleWare/authMiddleware.js";
const router2 = express.Router();
// Protected route
router.get("/", verifyToken, (req, res) => {
  res.status(200).json({ message: "Protected route accessed" });
});

export default router2;
