const express = require("express");
const categoryController = require("../controller/categoryController");
const categoryRouter = express.Router();

categoryRouter.get("/", categoryController.getAllCategory);

module.exports = categoryRouter;
