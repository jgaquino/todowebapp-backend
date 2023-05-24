import express from "express";
import "./configs/envVariables";
import cors from "cors";
import bodyParser from "body-parser";
import connectMongoDb from "./db/connectMongoDb";
import handle404 from "./configs/handle404";
import handleErrors from "./configs/handleErrors";

import todosRoutes from "./routes/todos";
import userAuthRoutes from "./routes/authentication";
import verifyToken from "./authentication/verifyToken";

const port = 4000;
const app = express();

(async () => {
  await connectMongoDb();

  app.use(cors());
  // Json parser
  app.use(bodyParser.json());

  // User authentication API
  app.use("/", userAuthRoutes);
  // Todos API
  app.use("/todos", verifyToken, todosRoutes);

  // 404
  app.use(handle404);
  // Handle errors
  app.use(handleErrors);

  app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
  });
})();
