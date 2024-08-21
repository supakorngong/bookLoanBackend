const bcrypt = require("bcryptjs");
const hashService = {};

hashService.hashPassword = (plainText) => {
  return bcrypt.hash(plainText, 10);
};
module.exports = hashService;
