const express = require("express");
const { registerValidator, loginValidator } = require("../middleware/validator");
const adminController = require("../controller/adminController");
const authAdminRouter = express.Router();

authAdminRouter.post("/register", registerValidator, adminController.register);
authAdminRouter.post("/login", loginValidator, adminController.login);

module.exports = authAdminRouter;
