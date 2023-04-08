import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import connectMongoDb from "./db/connectMongoDb";
import todosRoutes from "./routes/todos";
import handle404 from "./configs/handle404";
import handleErrors from "./configs/handleErrors";
const port = 4000;
const app = express();

(async () => {
  await connectMongoDb();

  app.use(cors());
  // Create application/json parser
  app.use(bodyParser.json());

  // Todos API
  app.use("/todos", todosRoutes);

  // 404
  app.use(handle404);
  // Handle errors
  app.use(handleErrors);

  // Start server
  app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
  });
})();
