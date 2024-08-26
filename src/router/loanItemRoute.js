const express = require("express");
const checkRole = require("../middleware/checkRole");
const loanItemController = require("../controller/loanItemController");

const loanItemRouter = express.Router();
loanItemRouter.get("/:id", checkRole, loanItemController.findLoanItemByLoanId);
module.exports = loanItemRouter;
