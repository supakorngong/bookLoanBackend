const prisma = require("../model/prisma");

const customerService = {};
customerService.findCustomerByEmail = (email) => {
  return prisma.customer.findFirst({
    where: {
      email,
    },
  });
};
customerService.findAllCustomer = () => {
  return prisma.customer.findMany({});
};
customerService.findCustomerById = (id) => {
  return prisma.customer.findFirst({ where: { id } });
};
module.exports = customerService;
