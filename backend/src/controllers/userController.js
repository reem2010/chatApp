import { compare, hash } from "bcrypt";
import jwt from "jsonwebtoken";
import { get_user, createUser, getById } from "../models/userModels.js";

export const login = async (req, res) => {
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
    const token = jwt.sign(
      { userId: email_is_exist.id },
      process.env.SecretKey,
      {
        expiresIn: "1h",
      }
    );
    const cookieOptions = {
      httpOnly: true,
      secure: true,
      sameSite: "none",
      partitioned: true,
    };
    res.cookie("token", token, cookieOptions);
    res
      .status(200)
      .json({ message: "user logged in", userId: email_is_exist.id });
  } catch (error) {
    res.status(500).json({ error: `Login ${error}` });
  }
};

export const register = async (req, res) => {
  try {
    const { username, email, password } = req.body;
    const hashed_pass = await hash(password, 10);
    const user = await get_user(email);
    if (user) {
      res.status(200).json({ message: "email is already exist" });
    } else {
      const user = await createUser({
        name: username,
        email: email,
        password: hashed_pass,
      });
      const token = jwt.sign({ userId: user.id }, process.env.SecretKey, {
        expiresIn: "1h",
      });
      const cookieOptions = {
        httpOnly: true,
        secure: true,
        sameSite: "none",
        partitioned: true,
      };
      console.log(token);
      res.cookie("token", token, cookieOptions);
      res.status(201).json({ message: "User registered successfully" });
    }
  } catch (err) {
    res.status(500).json({ error: err });
  }
};

export const logout = async (req, res) => {
  res.clearCookie("token");
  res.status(200).json({ message: "logged out" });
};

export const userData = async (req, res) => {
  try {
    const userId = req.userId;
    const user = await getById(userId);
    return res.status(200).json({ name: user.name });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
