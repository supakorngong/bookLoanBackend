const hashService = require("../service/hashService");
const staffService = require("../service/staffService");
const createError = require("../utils/createError");

const adminController = {};
adminController.register = async (req, res, next) => {
  try {
    const infoStaff = req.input;
    const isExist = await staffService.findStaffByEmail(infoStaff.email);

    if (isExist) {
      createError({ message: "this email already registered", statusCode: 409 });
    }
    if (infoStaff.roleId !== 2) createError({ message: "your role Id is not correct ", statusCode: 400 });

    infoStaff.password = await hashService.hashPassword(infoStaff.password);

    await staffService.createStaff(infoStaff);

    res.status(200).json({ message: "registered success" });
  } catch (err) {
    next(err);
  }
};
module.exports = adminController;
