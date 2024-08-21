const { registerSchema, registerCustomerSchema } = require("../validator/authValidator");

exports.registerValidator = async (req, res, next) => {
  try {
    const data = req.body;
    await registerSchema.validate(req.body);
    const { confirmPassword, ...information } = data;
    req.input = information;
    next();
  } catch (err) {
    next(err);
  }
};

exports.registerCustomerValidator = async (req, res, next) => {
  try {
    const data = req.body;
    await registerCustomerSchema.validate(req.body);
    const { confirmPassword, ...information } = data;
    req.input = information;
    next();
  } catch (err) {
    next(err);
  }
};
