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
      createError({ message: "user not found", statusCode: 400 });
    }
    if (foundUser.id !== 2) {
      createError({ message: "you are not an admin", statusCode: 401 });
    }
    delete foundUser.password;

    req.user = foundUser;

    next();
  } catch (err) {
    next(err);
  }
};
module.exports = authenticate;
