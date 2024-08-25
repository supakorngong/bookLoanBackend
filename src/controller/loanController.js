const { bookLoan } = require("../model/prisma");
const loanService = require("../service/loanService");
const createError = require("../utils/createError");
const { toIso, toDateTime } = require("../utils/dateTimeConvert");

const loanController = {};

loanController.creteLoan = async (req, res, next) => {
  try {
    const staff = req.user;
    const loanInfo = req.body;
    // const date = new Date(loanInfo.returnDate);
    // loanInfo.returnDate = date.toISOString();
    loanInfo.returnDate = toIso(loanInfo.returnDate);
    const data = { staffId: staff.id, ...loanInfo };
    await loanService.createLoan(data);
    res.status(200).json({ message: "loan success" });
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

    res.status(200).json({ message: response });
  } catch (err) {
    next(err);
  }
};

loanController.getAllLoan = async (req, res, next) => {
  try {
    const allLoan = await loanService.findAllLoan();
    const convertedIso = allLoan.map((el) => ({ ...el, loanDate: toDateTime(el.loanDate), returnDate: toDateTime(el.returnDate) }));
    res.status(200).json({ loan: convertedIso });
  } catch (err) {
    next(err);
  }
};
loanController.getLoanById = async (req, res, next) => {
  try {
    const loanId = req.params.id;
    const isExist = await loanService.findLoanById(+loanId);
    if (!isExist) {
      createError({ message: "this loan is not existed", statusCode: 401 });
    }
    console.log(isExist.loanDate);
    isExist.loanDate = toDateTime(isExist.loanDate);
    isExist.returnDate = toDateTime(isExist.returnDate);
    res.status(200).json({ loan: isExist });
  } catch (err) {
    next(err);
  }
};

module.exports = loanController;
