import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";

interface AuthPayload {
  email: string;
  role: string;
}

export interface AuthRequest extends Request {
  user?: AuthPayload;
}

const authenticate = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer")) {
      return res.status(401).json({
        success: false,
        message: "Unathenticated",
      });
    }

    const token = authHeader.split(" ")[1];
    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET || "jwt-secret"
    ) as AuthPayload;

    req.user = decoded;
    next();
  } catch (error) {
    console.log(`Something went wrong ${error}`);
    return res.status(500).json({
      success: false,
      message: "Invalid or expired token",
    });
  }
};

export default authenticate;
