const prisma = require("../model/prisma");

const bookLoanItemService = {};

bookLoanItemService.findBookLoanItemByLoanId = (loanId) => {
  return prisma.bookLoanItem.findMany({ where: { bookLoanId: loanId }, include: { book: true } });
};
module.exports = bookLoanItemService;
