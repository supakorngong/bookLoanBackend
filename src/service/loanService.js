const prisma = require("../model/prisma");

const loanService = {};
loanService.createLoan = (data) => {
  return prisma.$transaction(async (tx) => {
    const loan = await tx.bookLoan.create({
      data: {
        staffId: data.staffId,
        customerId: data.customerId,
        returnDate: data.returnDate,
      },
    });
    const bookWithLoanId = data.books.map((el) => ({ ...el, bookLoanId: loan.id }));
    await tx.bookLoanItem.createMany({ data: bookWithLoanId });
  });
};

module.exports = loanService;
