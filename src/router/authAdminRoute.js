const express = require("express");
const { registerValidator } = require("../middleware/validator");
const adminController = require("../controller/adminController");
const authAdminRouter = express.Router();

authAdminRouter.post("/register", registerValidator, adminController.register);
// authAdminRouter.post()

module.exports = authAdminRouter;
