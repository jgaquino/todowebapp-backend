import express, { NextFunction, Request, Response } from "express";
import Todo from "../../models/Todo";
const router = express.Router();

router.get("/", async (req: Request, res: Response, next: NextFunction) => {
  try {
    const todos = await Todo.find();
    res.json(todos);
  } catch (error) {
    next(error);
  }
});

router.put(
  "/create",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const newTodo = await new Todo(req.body).save();
      res.json(newTodo.toObject());
    } catch (error) {
      next(error);
    }
  }
);

router.delete(
  "/delete/:id",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const id = req.params.id;
      const response = await Todo.deleteOne({ id });
      if (!response || response.deletedCount !== 1)
        throw new Error(`Sorry, can't delete todo with id '${id}'`);
      res.json({ deleted: true });
    } catch (err) {
      next(err);
    }
  }
);
router.patch(
  "/mark-completed/:id",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const id = req.params.id;
      const response = await Todo.updateOne({ id }, { completed: true });
      if (response.matchedCount !== 1)
        throw new Error("Sorry, can't mark as completed");
      res.json({ completed: true });
    } catch (err) {
      next(err);
    }
  }
);
router.patch(
  "/mark-uncompleted/:id",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const id = req.params.id;
      const response = await Todo.updateOne({ id }, { completed: false });
      if (response.matchedCount !== 1)
        throw new Error("Sorry, can't mark as uncompleted");
      res.json({ completed: false });
    } catch (err) {
      next(err);
    }
  }
);

export default router;
