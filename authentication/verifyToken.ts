import { NextFunction, Response } from "express";
import { RequestWithUser } from "./RequestWithUser";
import jwt from "jsonwebtoken";

const verifyToken = (
  req: RequestWithUser,
  res: Response,
  next: NextFunction
) => {
  try {
    const token = req.get("Authorization");
    if (!token) throw new Error("access-denied");

    const verified = jwt.verify(token, process.env.JWT_SECRET_STRING as string);
    if (!verified) throw new Error("Invalid token");

    req.user = verified;
    next();
  } catch (error) {
    next(error);
  }
};

export default verifyToken;
