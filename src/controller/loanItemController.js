const bookLoanItemService = require("../service/loanItemService");
const createError = require("../utils/createError");

const loanItemController = {};
loanItemController.findLoanItemByLoanId = async (req, res, next) => {
  try {
    const loanId = req.params.id;
    const bookItems = await bookLoanItemService.findBookLoanItemByLoanId(+loanId);
    if (!bookItems) {
      createError({ message: "this loanId is not found", statusCode: 200 });
    }
    res.status(200).json({ bookItems });
  } catch (err) {
    next(err);
  }
};
module.exports = loanItemController;
