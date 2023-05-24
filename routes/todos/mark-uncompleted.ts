import { NextFunction, Response } from "express";
import { RequestWithUser } from "../../authentication/RequestWithUser";
import Todo from "../../models/Todo";

const markUncompleted = async (
  req: RequestWithUser,
  res: Response,
  next: NextFunction
) => {
  try {
    const id = req.params.id;
    const response = await Todo.updateOne(
      { id, owner: req.user.email },
      { completed: false }
    );
    if (response.matchedCount !== 1)
      throw new Error("Sorry, can't mark as uncompleted");
    res.json({ completed: false });
  } catch (err) {
    next(err);
  }
};

export default markUncompleted;
