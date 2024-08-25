const express = require("express");
const { registerValidator, registerCustomerValidator, loginValidator } = require("../middleware/validator");
const staffController = require("../controller/staffController");
const authenticate = require("../middleware/authenticate");
const checkRole = require("../middleware/checkRole");
const authRouter = express.Router();

// authRouter.post("/register", registerValidator, staffController.register);

authRouter.post("/register/customer", checkRole, registerCustomerValidator, staffController.registerCustomer);

authRouter.post("/login", loginValidator, staffController.login);

authRouter.post("/refresh", checkRole, staffController.refreshToken);

// authRouter.get();
// authRouter.get();

module.exports = authRouter;
