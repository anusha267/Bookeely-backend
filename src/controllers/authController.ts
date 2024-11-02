import { Request, Response } from "express";
import * as authService from "../services/authService";

export const register = async (req: Request, res: Response) => {
  const { email, password, username } = req.body;

  try {
    const newUser = await authService.registerUser(email, password, username);
    res.status(201).json({
      message: "User registered successfully",
      userId: newUser.user_id,
    });
  } catch (error: any) {
    if (error.message.includes("duplicate email")) {
      res.status(400).json({ error: "Email already in use" });
    } else if (error.message.includes("duplicate key")) {
      res.status(400).json({ error: "Username already in use" });
    } else {
      res.status(500).json({ error: "Internal server error" });
    }
  }
};

export const login = async (req: Request, res: Response) => {
  const { username, email, password } = req.body;

  try {
    const { token, userId } = await authService.loginUser(
      username || email,
      password
    );
    res.status(200).json({ token, userId });
  } catch (error: any) {
    if (error.message === "Invalid username or password") {
      res.status(401).json({ error: "Invalid username or password" });
    } else {
      res.status(500).json({ error: "Internal server error" });
    }
  }
};
