import User from "../../models/User";
import { IUser } from "../../entities/User";
import { NextFunction, Request, Response } from "express";
import bcrypt from "bcrypt";
import Joi from "@hapi/joi";
import jwt from "jsonwebtoken";

const schemaRegister = Joi.object({
  fullname: Joi.string().min(6).max(30).required(),
  email: Joi.string().min(6).max(100).required().email(),
  password: Joi.string().min(6).max(100).required(),
});

const signup = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { error } = schemaRegister.validate(req.body);
    if (error) throw new Error(error.details[0].message);

    const isEmailExist = await User.findOne({ email: req.body.email });
    if (isEmailExist) throw new Error("Email already exist");

    const savedUser = await new User<IUser>({
      fullname: req.body.fullname,
      email: req.body.email,
      password: await bcrypt.hash(req.body.password, 10),
    }).save();

    const token = jwt.sign(
      { fullname: savedUser.fullname, email: savedUser.email },
      process.env.JWT_SECRET_STRING as string
    );

    return res.json(token);
  } catch (error) {
    next(error);
  }
};

export default signup;
