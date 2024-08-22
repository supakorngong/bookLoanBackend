const express = require("express");
const authenticate = require("../middleware/authenticate");
const loanController = require("../controller/loanController");
const loanRouter = express.Router();
loanRouter.post("/", authenticate, loanController.creteLoan);
loanRouter.patch("/:id", authenticate, loanController.updateLoan);
module.exports = loanRouter;
