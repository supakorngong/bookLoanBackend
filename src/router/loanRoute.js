const express = require("express");
const authenticate = require("../middleware/authenticate");
const loanController = require("../controller/loanController");
const checkRole = require("../middleware/checkRole");

const loanRouter = express.Router();

loanRouter.post("/", authenticate, loanController.creteLoan);
loanRouter.patch("/:id", authenticate, loanController.updateLoan);
loanRouter.get("/", checkRole, loanController.getAllLoan);
loanRouter.get("/:id", checkRole, loanController.getLoanById);

module.exports = loanRouter;
