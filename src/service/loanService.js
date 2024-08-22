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
loanService.updateLoaById = (data) => {
  return prisma.bookLoan.update({ where: { id: data.bookLoanId }, data: { isReturned: data.isReturned } });
};
loanService.findLoanById = (id) => {
  return prisma.bookLoan.findFirst({ where: { id } });
};

module.exports = loanService;
