import { NextFunction, Request, Response } from "express";
import User from "../models/User";
import { IUser } from "../entities/User";
import Joi from "@hapi/joi";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const schemaLogin = Joi.object({
  email: Joi.string().min(6).max(255).required().email(),
  password: Joi.string().min(6).max(1024).required(),
});

const login = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { error } = schemaLogin.validate(req.body);
    if (error) throw new Error(error.details[0].message);

    const user: IUser | null = await User.findOne({ email: req.body.email });
    if (!user) throw new Error("User not found");

    const validPassword = await bcrypt.compare(
      req.body.password,
      user.password
    );
    if (!validPassword) throw new Error("Invalid password");

    const token = jwt.sign(
      { fullname: user.fullname, email: user.email },
      "MY_JWT_SECRET_STRING"
    );
    return res.json(token);
  } catch (error) {
    next(error);
  }
};

export default login;
