const prisma = require("../model/prisma");

const categoryService = {};
categoryService.getAllCategory = () => {
  return prisma.category.findMany({});
};
module.exports = categoryService;
