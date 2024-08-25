const express = require("express");
const { registerCustomerValidator, loginValidator } = require("../middleware/validator");
const staffController = require("../controller/staffController");
const checkRole = require("../middleware/checkRole");
const authenticate = require("../middleware/authenticate");
const authRouter = express.Router();

authRouter.post("/register/customer", authenticate, registerCustomerValidator, staffController.registerCustomer);

authRouter.post("/login", loginValidator, staffController.login);

authRouter.post("/refresh", checkRole, staffController.refreshToken);

module.exports = authRouter;
