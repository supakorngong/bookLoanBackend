const express = require("express");
const { registerValidator, loginValidator } = require("../middleware/validator");
const adminController = require("../controller/adminController");
const adminAuthenticate = require("../middleware/adminAuthenticate");
const authAdminRouter = express.Router();

authAdminRouter.post("/register", adminAuthenticate, registerValidator, adminController.register);

authAdminRouter.post("/register/employee", adminAuthenticate, registerValidator, adminController.registerEmployee);

authAdminRouter.post("/login", loginValidator, adminController.login);

module.exports = authAdminRouter;
