// routes/auth.js
import { Router } from "express";
import { createUser } from "../models/userModels.js";
import { compare, hash } from "bcrypt";
import jwt from "jsonwebtoken";
import { get_user } from "../models/userModels.js";
const router = Router();
router.post("/login", async (req, res) => {
  try {
    const { password, email } = req.body;
    const email_is_exist = await get_user(email);
    if (!email_is_exist) {
      return res.status(401).json({ error: "Authentication failed" });
    }
    const passwordMatch = await compare(password, email_is_exist.password);
    if (!passwordMatch) {
      return res.status(401).json({ error: "Authentication failed" });
    }
    const token = jwt.sign({ userId: email_is_exist.id }, process.env.SecretKey, {
      expiresIn: "1h",
    });
    const cookieOptions = {
      httpOnly: true,
      secure: true,
      sameSite: 'none',
      partitioned: true,
    };
    res.cookie("token", token, cookieOptions);
    res.status(200).json({ message: "user logged in", userId:  email_is_exist.id});
  } catch (error) {
    res.status(500).json({ error: `Login ${error}` });
  }
});
router.post("/register", async (req, res) => {
  try {
    const { username, email, password } = req.body;
    const hashed_pass = await hash(password, 10);
    const user = get_user(email)
    if (user) {
      res.status(200).json({message: "email is already exist"})
    }else{
    await createUser({ name: username, email: email, password: hashed_pass });
    res.status(201).json({ message: "User registered successfully" });}
  } catch (err) {
    res.status(500).json({ error: err });
  }
});

router.post("/logout", async (req, res) => {
  res.clearCookie("token")
  res.status(200).json({message: "logged out"});
});
export default router;
