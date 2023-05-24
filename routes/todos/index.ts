import express from "express";
import get from "./get";
import create from "./create";
import remove from "./remove";
import markCompleted from "./mark-completed";
import markUncompleted from "./mark-uncompleted";

const router = express.Router();

router.get("/", get);
router.put("/create", create);
router.delete("/delete/:id", remove);
router.patch("/mark-completed/:id", markCompleted);
router.patch("/mark-uncompleted/:id", markUncompleted);

export default router;
