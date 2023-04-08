import { Schema, model } from "mongoose";
import { IUser } from "../entities/User";

const User = new Schema<IUser>({
  fullname: String,
  email: String,
  password: String,
});

export default model<IUser>("User", User);
