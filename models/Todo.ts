import { Schema, model } from "mongoose";
import { ITodo } from "../entities/Todo";

const Todo = new Schema<ITodo>({
  id: {
    type: String,
    unique: true,
  },
  title: String,
  completed: Boolean,
});

export default model<ITodo>("Todo", Todo);
