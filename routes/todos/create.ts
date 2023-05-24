import { NextFunction, Response } from "express";
import { RequestWithUser } from "../../authentication/RequestWithUser";
import Todo from "../../models/Todo";

const create = async (
  req: RequestWithUser,
  res: Response,
  next: NextFunction
) => {
  try {
    const newTodo = await new Todo({
      ...req.body,
      owner: req.user.email,
    }).save();
    res.json(newTodo.toObject());
  } catch (error) {
    next(error);
  }
};

export default create;
