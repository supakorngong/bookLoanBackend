const prisma = require("../model/prisma");

const staffService = {};
staffService.findStaffByEmail = (email) => {
  return prisma.staff.findFirst({
    where: {
      email,
    },
  });
};
staffService.createStaff = (data) => {
  return prisma.staff.create({ data });
};
staffService.createCustomer = (data) => {
  return prisma.customer.create({ data });
};
module.exports = staffService;
