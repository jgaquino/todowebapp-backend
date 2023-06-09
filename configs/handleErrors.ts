import { NextFunction, Request, Response } from "express";

const handleErrors = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (err.message === "access-denied")
    return res.status(403).json({ error: err.message });
  return res.status(500).json({ error: err.message });
};

export default handleErrors;
