"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = require("mongoose");
var Todo = new mongoose_1.Schema({
    id: String,
    title: String,
    completed: Boolean,
});
exports.default = (0, mongoose_1.model)("Todo", Todo);
