const prisma = require("../model/prisma");

const staffService = {};
staffService.findStaffByEmail = (email) => {
  return prisma.staff.findFirst({
    where: {
      email,
    },
  });
};
staffService.findStaffById = (id) => {
  return prisma.staff.findFirst({
    where: {
      id,
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
