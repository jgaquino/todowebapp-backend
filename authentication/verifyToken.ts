import { NextFunction, Response } from "express";
import { RequestWithUser } from "./RequestWithUser";
import jwt from "jsonwebtoken";
import JWT_SECRET_STRING from "./JWT_SECRET_STRING";

const verifyToken = (
  req: RequestWithUser,
  res: Response,
  next: NextFunction
) => {
  try {
    const token = req.get("Authorization");
    if (!token) throw new Error("access-denied");

    const verified = jwt.verify(token, JWT_SECRET_STRING);
    if (!verified) throw new Error("Invalid token");

    req.user = verified;
    next();
  } catch (error) {
    next(error);
  }
};

export default verifyToken;
