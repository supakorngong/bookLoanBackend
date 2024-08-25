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
    const bookId = data.books.map((el) => el.bookId);

    const updateBook = data.books.map((el) => tx.book.update({ where: { id: el.bookId }, data: { loanTime: { increment: el.quantity } } }));

    await Promise.all(updateBook);
  });
};
loanService.updateLoaById = (data) => {
  return prisma.bookLoan.update({ where: { id: data.bookLoanId }, data: { isReturned: data.isReturned } });
};

loanService.findAllLoan = (id) => {
  return prisma.bookLoan.findMany({});
};

loanService.findLoanById = (id) => {
  return prisma.bookLoan.findFirst({ where: { id } });
};

module.exports = loanService;
