import { NextFunction, Response } from "express";
import { RequestWithUser } from "../../authentication/RequestWithUser";
import Todo from "../../models/Todo";

const markCompleted = async (
  req: RequestWithUser,
  res: Response,
  next: NextFunction
) => {
  try {
    const id = req.params.id;
    const response = await Todo.updateOne(
      { id, owner: req.user.email },
      { completed: true }
    );
    if (response.matchedCount !== 1)
      throw new Error("Sorry, can't mark as completed");
    res.json({ completed: true });
  } catch (err) {
    next(err);
  }
};

export default markCompleted;
