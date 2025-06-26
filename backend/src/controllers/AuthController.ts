import mongoose from "mongoose";
import jwt from "jsonwebtoken";

import { Request, Response } from "express";

import { UserModel } from "../models/UserModel";

export const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    const user = await UserModel.findOne({ email });

    console.log("user", user);

    if (!user) {
      return res.status(401).json({
        success: false,
        message: "Email or password is incorrect",
      });
    }

    const passwordMatch = await user.comparePassword(password);

    if (!passwordMatch) {
      return res.status(401).json({
        success: false,
        message: "Email or password is incorrect",
      });
    }

    const token = jwt.sign(
      {
        email: user.email,
        role: user.role,
      },
      process.env.JWT_SECRET || "jwt-secret",
      {
        expiresIn: "1h",
      }
    );

    res.status(200).json({
      success: true,
      message: "Authentication successful",
      token: token,
      user: {
        email: user.email,
        role: user.role,
      },
    });
  } catch (error) {
    console.error("Something went wrong");
    res.status(500).json({
      success: false,
      message: "Something went wrong",
    });
  }
};
