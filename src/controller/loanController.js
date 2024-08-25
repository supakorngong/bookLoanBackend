const bookService = require("../service/bookService");
const loanService = require("../service/loanService");
const createError = require("../utils/createError");
const { toIso, toDateTime } = require("../utils/dateTimeConvert");

const loanController = {};

loanController.creteLoan = async (req, res, next) => {
  try {
    const staff = req.user;
    const loanInfo = req.body;
    const booksId = loanInfo.books.map((el) => el.bookId);

    const allBooksInLoan = await bookService.findBookInLoan(booksId);
    const isExist = allBooksInLoan.filter((el) => el.isDelete);
    const isAvailable = allBooksInLoan.filter((el) => el.quantity <= 0);

    if (isExist.length) {
      const deletedBook = isExist.map((el) => el.name);
      createError({ message: `${deletedBook} is removed` });
    }
    if (isAvailable.length) {
      const unAvailableBook = isAvailable.map((el) => el.name);
      createError({ message: `${unAvailableBook} is unAvailable` });
    }

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
      createError({ message: "this loan is not existed", statusCode: 200 });
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
      createError({ message: "this loan is not existed", statusCode: 200 });
    }
    isExist.loanDate = toDateTime(isExist.loanDate);
    isExist.returnDate = toDateTime(isExist.returnDate);
    res.status(200).json({ loan: isExist });
  } catch (err) {
    next(err);
  }
};

module.exports = loanController;
