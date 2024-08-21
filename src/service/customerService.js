const prisma = require("../model/prisma");

const customerService = {};
customerService.findCustomerByEmail = (email) => {
  return prisma.customer.findFirst({
    where: {
      email,
    },
  });
};
module.exports = customerService;
