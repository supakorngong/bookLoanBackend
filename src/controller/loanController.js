const { bookLoan } = require("../model/prisma");
const loanService = require("../service/loanService");
const createError = require("../utils/createError");

const loanController = {};
loanController.creteLoan = async (req, res, next) => {
  try {
    const staff = req.user;
    const loanInfo = req.body;
    const date = new Date(loanInfo.returnDate);
    loanInfo.returnDate = date.toISOString();
    const data = { staffId: staff.id, ...loanInfo };
    const response = await loanService.createLoan(data);
    res.status(200).json({ message: response });
  } catch (err) {
    next(err);
  }
};
loanController.updateLoan = async (req, res, next) => {
  try {
    const loanId = req.params;
    const isExist = await loanService.findLoanById(+loanId.id);
    if (!isExist) {
      createError({ message: "this loan is not existed", statusCode: 401 });
    }
    const data = { bookLoanId: +loanId.id, isReturned: req.body.isReturned };
    const response = await loanService.updateLoaById(data);
    //เเก้ไข สถานะ การยืมเท่านั้น
    res.status(200).json({ message: response });
  } catch (err) {
    next(err);
  }
};
module.exports = loanController;
