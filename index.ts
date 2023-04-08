import express, { NextFunction, Request, Response } from "express";
import cors from "cors";
import bodyParser from "body-parser";
import connectMongoDb from "./db/connectMongoDb";
import Todo from "./models/Todo";

const port = 3000;
const app = express();

(async () => {
  await connectMongoDb();

  app.use(cors());

  // create application/json parser
  const jsonParser = bodyParser.json();

  app.use(jsonParser);

  app.get("/todos", async (req: Request, res: Response) => {
    const todos = await Todo.find();
    res.json(todos);
  });
  app.put("/todos/create", async (req: Request, res: Response) => {
    const newTodo = await new Todo(req.body).save();
    res.json(newTodo.toObject());
  });
  app.delete(
    "/todos/delete/:id",
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
  app.patch(
    "/todos/mark-completed/:id",
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
  app.patch(
    "/todos/mark-uncompleted/:id",
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

  //404
  app.use(function (req: Request, res: Response) {
    res.status(404).send("Sorry can't find that!");
  });

  //handle errors
  app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
    res.status(500).json({ message: err.message });
  });

  //start server
  app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
  });
})();
