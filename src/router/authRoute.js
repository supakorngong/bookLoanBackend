const express = require("express");
const { registerValidator, registerCustomerValidator } = require("../middleware/validator");
const staffController = require("../controller/staffController");
const authRouter = express.Router();

authRouter.post("/register", registerValidator, staffController.register);

authRouter.post("/register/customer", registerCustomerValidator, staffController.registerCustomer);

// authRouter.post();
// authRouter.get();
// authRouter.get();

module.exports = authRouter;
