const bcrypt = require("bcryptjs");
const hashService = {};

hashService.hashPassword = (plainText) => {
  return bcrypt.hash(plainText, 10);
};
hashService.comparePassword = (plainText, hashValue) => {
  return bcrypt.compare(plainText, hashValue);
};
module.exports = hashService;
