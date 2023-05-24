import express from "express";
import "./configs/envVariables";
import cors from "cors";
import bodyParser from "body-parser";
import connectMongoDb from "./db/connectMongoDb";
import handle404 from "./configs/handle404";
import handleErrors from "./configs/handleErrors";

import todosRoutes from "./routes/todos";
import signup from "./routes/authentication/signup";
import login from "./routes/authentication/login";
import verifyToken from "./authentication/verifyToken";

const port = 4000;
const app = express();

(async () => {
  await connectMongoDb();

  app.use(cors());
  // Create application/json parser
  app.use(bodyParser.json());

  // User authentication API
  app.post("/signup", signup);
  app.post("/login", login);
  // Todos API
  app.use("/todos", verifyToken, todosRoutes);

  // 404
  app.use(handle404);
  // Handle errors
  app.use(handleErrors);

  // Start server
  app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
  });
})();
