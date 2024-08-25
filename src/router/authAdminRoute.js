const express = require("express");
const { registerValidator, loginValidator } = require("../middleware/validator");
const checkRole = require("../middleware/checkRole");
const adminController = require("../controller/adminController");
const authAdminRouter = express.Router();

authAdminRouter.post("/register", checkRole, registerValidator, adminController.register);
authAdminRouter.post("/login", loginValidator, adminController.login);

module.exports = authAdminRouter;
