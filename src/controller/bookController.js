const bookService = require("../service/bookService");
const createError = require("../utils/createError");

const bookController = {};
bookController.findPopularBook = async (req, res, next) => {
  try {
    const popularBook = await bookService.findPopularBook();
    const allPopularBook = await bookService.findAllPopularBook(popularBook.loanTime);
    res.status(200).json({ allPopularBook });
  } catch (err) {
    next(err);
  }
};
bookController.addNewBook = async (req, res, next) => {
  try {
    const staffData = req.user;
    const bookData = req.body;
    if (!staffData.role.createBookRecord) {
      createError({ message: "not authorized", statusCode: 401 });
    }
    // console.log(bookData);
    await bookService.createNewBook(bookData.books);
    res.status(200).json({ message: "add success " });
  } catch (err) {
    next(err);
  }
};
bookController.updateBookData = async (req, res, next) => {
  try {
    const staffData = req.user;
    const bookId = req.params.id;
    const bookData = req.body;
    if (!staffData.role.editBookRecord) {
      createError({ message: "not authorized", statusCode: 401 });
    }
    // console.log(bookData);
    const isExist = await bookService.findBookById(+bookId);
    if (!isExist) {
      createError({ message: "this book is not exist", statusCode: 404 });
    }
    const updatedBook = await bookService.updateBookData(+bookId, bookData);
    res.status(200).json({ message: "update success", updatedBook });
  } catch (err) {
    next(err);
  }
};
bookController.deleteBook = async (req, res, next) => {
  try {
    const staffData = req.user;
    const bookId = req.params.id;
    if (!staffData.role.deleteBookRecord) {
      createError({ message: "not authorized", statusCode: 401 });
    }
    // console.log(bookData);
    const isExist = await bookService.findBookById(+bookId);
    if (!isExist) {
      createError({ message: "this book is not exist", statusCode: 404 });
    }
    await bookService.deleteBook(+bookId);
    res.status(200).json({ message: "delete success" });
  } catch (err) {
    next(err);
  }
};

bookController.getAllBook = async (req, res, next) => {
  try {
    const staffData = req.user;
    if (!staffData.role.readBookRecord) {
      createError({ message: "not authorized", statusCode: 401 });
    }
    const allBook = await bookService.getAllBook();
    res.status(200).json(allBook);
  } catch (err) {
    next(err);
  }
};
bookController.searchBookByKeyword = async (req, res, next) => {
  try {
    const staffData = req.user;
    if (!staffData.role.readBookRecord) {
      createError({ message: "not authorized", statusCode: 401 });
    }
    const data = req.query;

    if (data.bookName) {
      const searchedBook = await bookService.findBookByName(data.bookName);

      res.status(200).json(searchedBook);
    } else if (data.author) {
      const searchedBook = await bookService.findBookByAuthor(data.author);

      res.status(200).json(searchedBook);
    } else {
      res.status(200).json({ message: "this book is not found" });
    }
  } catch (err) {
    next(err);
  }
};

// bookController.findBookByName = async (req, res, next) => {
//   try {
//     const staffData = req.user;
//     if (!staffData.role.readBookRecord) {
//       createError({ message: "not authorized", statusCode: 401 });
//     }
//     const data = req.body.search;
//     const searchedBooks = await bookService.findBookByName(data);
//     res.status(200).json(searchedBooks);
//   } catch (err) {
//     next(err);
//   }
// };
// bookController.findBookByAuthor = async (req, res, next) => {
//   try {
//     const staffData = req.user;
//     if (!staffData.role.readBookRecord) {
//       createError({ message: "not authorized", statusCode: 401 });
//     }
//     const data = req.body.search;
//     const searchedBooks = await bookService.findBookByAuthor(data);
//     res.status(200).json(searchedBooks);
//   } catch (err) {
//     next(err);
//   }
// };
bookController.findBookByCategory = async (req, res, next) => {
  try {
    const staffData = req.user;
    if (!staffData.role.readBookRecord) {
      createError({ message: "not authorized", statusCode: 401 });
    }
    const data = req.body.search;
    const searchedBooks = await bookService.findBookByCategory(data);
    res.status(200).json(searchedBooks);
  } catch (err) {
    next(err);
  }
};

module.exports = bookController;
