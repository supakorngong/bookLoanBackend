const express = require("express");
const { registerValidator, registerCustomerValidator, loginValidator } = require("../middleware/validator");
const staffController = require("../controller/staffController");
const authenticate = require("../middleware/authenticate");
const authRouter = express.Router();

authRouter.post("/register", registerValidator, staffController.register);

authRouter.post("/register/customer", registerCustomerValidator, staffController.registerCustomer);

authRouter.post("/login", loginValidator, staffController.login);

authRouter.post("/refresh", authenticate, staffController.refreshToken);

// authRouter.get();
// authRouter.get();

module.exports = authRouter;
