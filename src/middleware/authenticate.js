const jwtService = require("../service/jwtService");
const staffService = require("../service/staffService");
const createError = require("../utils/createError");

const authenticate = async (req, res, next) => {
  try {
    const authorization = req.headers.authorization;
    if (!authorization || !authorization.startsWith("Bearer ")) {
      createError({ message: "unauthorized", statusCode: 401 });
    }
    const token = authorization.split(" ")[1];
    const payLoad = jwtService.verify(token);

    const foundUser = await staffService.findStaffById(payLoad.id);
    if (!foundUser) {
      createError({ message: "user not found", statusCode: 200 });
    }
    if (foundUser.roleId !== 1) {
      createError({ message: "you are not an employee", statusCode: 403 });
    }
    delete foundUser.password;

    req.user = foundUser;

    next();
  } catch (err) {
    next(err);
  }
};
module.exports = authenticate;
