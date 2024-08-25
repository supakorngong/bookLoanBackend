const express = require("express");
const bookController = require("../controller/bookController");
const checkRole = require("../middleware/checkRole");
const bookRouter = express.Router();

bookRouter.get("/popular", bookController.findPopularBook);
bookRouter.get("/", checkRole, bookController.getAllBook);

// bookRouter.get("/search/bookName", checkRole, bookController.findBookByName);
// bookRouter.get("/search/author", checkRole, bookController.findBookByAuthor);

bookRouter.get("/search", checkRole, bookController.searchBookByKeyword);

bookRouter.get("/search/category", checkRole, bookController.findBookByCategory);

bookRouter.post("/", checkRole, bookController.addNewBook);
bookRouter.patch("/:id", checkRole, bookController.updateBookData);
bookRouter.delete("/:id", checkRole, bookController.deleteBook);

module.exports = bookRouter;