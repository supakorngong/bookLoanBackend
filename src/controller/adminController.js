const hashService = require("../service/hashService");
const jwtService = require("../service/jwtService");
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

adminController.login = async (req, res, next) => {
  try {
    const staff = req.user;
    //check email
    const isExist = await staffService.findStaffByEmail(staff.email);
    //
    if (!isExist) {
      createError({ message: "this email is not found", statusCode: 400 });
    }
    if (isExist.roleId !== 2) {
      createError({ message: "you are not an admin", statusCode: 401 });
    }

    //check password
    const isMatched = await hashService.comparePassword(staff.password, isExist.password);
    //
    if (!isMatched) {
      createError({ message: "this password is not correct", statusCode: 400 });
    }
    //jwt service
    const accessToken = jwtService.sign({ id: isExist.id });
    const refreshToken = jwtService.signRefresh({ id: isExist.id });
    res.json({ accessToken, refreshToken });
  } catch (err) {
    next(err);
  }
};
module.exports = adminController;
