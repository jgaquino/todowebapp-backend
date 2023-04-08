import { NextFunction, Request, Response } from "express";

const handleErrors = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  res.status(500).json({ error: err.message });
};

export default handleErrors;
