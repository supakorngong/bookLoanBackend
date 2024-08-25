const categoryService = require("../service/categoryService");

const categoryController = {};
categoryController.getAllCategory = async (req, res, next) => {
  try {
    const allCategory = await categoryService.getAllCategory();
    res.status(200).json(allCategory);
  } catch (err) {
    next(err);
  }
};
module.exports = categoryController;
