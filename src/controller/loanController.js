const loanService = require("../service/loanService");

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
    //เเก้ไข สถานะ การยืมเท่านั้น
  } catch (err) {
    next(err);
  }
};
module.exports = loanController;
