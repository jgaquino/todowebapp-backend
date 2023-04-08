import { Request, Response } from "express";

const handle404 = function (req: Request, res: Response) {
  res.status(404).send("Sorry can't find that!");
};

export default handle404;
