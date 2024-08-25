const express = require("express");
const customerController = require("../controller/customerController");
const customerRouter = express.Router();

customerRouter.get("/", customerController.getAllCustomer);
customerRouter.get("/:id", customerController.getCustomerById);

module.exports = customerRouter;
