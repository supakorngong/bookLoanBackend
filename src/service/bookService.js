const prisma = require("../model/prisma");

const bookService = {};
bookService.findPopularBook = () => {
  return prisma.book.findFirst({ orderBy: { loanTime: "desc" }, take: 1 });
};

bookService.findAllPopularBook = (loanTime) => {
  return prisma.book.findMany({ where: { loanTime } });
};

bookService.findBookById = (id) => {
  return prisma.book.findFirst({ where: { id } });
};

bookService.getAllBook = () => {
  return prisma.book.findMany({});
};

bookService.createNewBook = (data) => {
  return prisma.book.createMany({ data });
};

bookService.updateBookData = (bookId, data) => {
  return prisma.book.update({ where: { id: bookId }, data });
};

bookService.deleteBook = (bookId) => {
  return prisma.book.update({ where: { id: bookId }, data: { isDelete: true } });
};

bookService.findBookByName = (data) => {
  return prisma.book.findMany({ where: { name: { contains: data } } });
};

bookService.findBookByAuthor = (data) => {
  return prisma.book.findMany({ where: { author: { contains: data } } });
};

bookService.findBookByCategory = (data) => {
  return prisma.book.findMany({ where: { categoryId: data } });
};

module.exports = bookService;
