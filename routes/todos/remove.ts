import { NextFunction, Response } from "express";
import { RequestWithUser } from "../../authentication/RequestWithUser";
import Todo from "../../models/Todo";

const remove = async (
  req: RequestWithUser,
  res: Response,
  next: NextFunction
) => {
  try {
    const id = req.params.id;
    const response = await Todo.deleteOne({ id });
    if (!response || response.deletedCount !== 1)
      throw new Error(`Sorry, can't delete todo with id '${id}'`);
    res.json({ deleted: true });
  } catch (err) {
    next(err);
  }
};

export default remove;
