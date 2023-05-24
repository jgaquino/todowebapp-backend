import { NextFunction, Response } from "express";
import { RequestWithUser } from "../../authentication/RequestWithUser";
import Todo from "../../models/Todo";

const get = async (req: RequestWithUser, res: Response, next: NextFunction) => {
  try {
    const todos = await Todo.find({ owner: req.user.email });
    res.json(todos);
  } catch (error) {
    next(error);
  }
};

export default get;
