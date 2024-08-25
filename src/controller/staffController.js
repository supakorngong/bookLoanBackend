const customerService = require("../service/customerService");
const hashService = require("../service/hashService");
const jwtService = require("../service/jwtService");
const staffService = require("../service/staffService");
const createError = require("../utils/createError");

const staffController = {};
staffController.register = async (req, res, next) => {
  try {
    const infoStaff = req.input;
    const isExist = await staffService.findStaffByEmail(infoStaff.email);

    if (isExist) {
      createError({ message: "this email already registered", statusCode: 409 });
    }
    if (infoStaff.roleId !== 1) createError({ message: "your role Id is not correct ", statusCode: 400 });

    infoStaff.password = await hashService.hashPassword(infoStaff.password);

    await staffService.createStaff(infoStaff);

    res.status(200).json({ message: "registered success" });
  } catch (err) {
    next(err);
  }
};
staffController.registerCustomer = async (req, res, next) => {
  try {
    const infoCustomer = req.input;
    const isExist = await customerService.findCustomerByEmail(infoCustomer.email);

    if (isExist) {
      createError({ message: "this email already registered", statusCode: 409 });
    }

    infoCustomer.password = await hashService.hashPassword(infoCustomer.password);

    await staffService.createCustomer(infoCustomer);

    res.status(200).json({ message: "registered success" });
  } catch (err) {
    next(err);
  }
};

staffController.login = async (req, res, next) => {
  try {
    const staff = req.user;
    //check email
    const isExist = await staffService.findStaffByEmail(staff.email);
    //
    if (!isExist) {
      createError({ message: "this email is not found", statusCode: 400 });
    }
    if (isExist.roleId !== 1) {
      createError({ message: "you are not an employee", statusCode: 401 });
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

staffController.refreshToken = async (req, res, next) => {
  try {
    const staff = req.user;
    const accessToken = jwtService.sign({ id: staff.id });
    const refreshToken = jwtService.signRefresh({ id: staff.id });
    res.json({ accessToken, refreshToken });
  } catch (err) {
    next(err);
  }
};
module.exports = staffController;
