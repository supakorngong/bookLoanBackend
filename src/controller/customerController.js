const customerService = require("../service/customerService");
const createError = require("../utils/createError");

const customerController = {};
customerController.getAllCustomer = async (req, res, next) => {
  try {
    const allCustomer = await customerService.findAllCustomer();
    allCustomer.forEach((el) => delete el.password);
    res.status(200).json({ allCustomer });
  } catch (err) {
    next(err);
  }
};
customerController.getCustomerById = async (req, res, next) => {
  try {
    const customerId = +req.params.id;
    const customer = await customerService.findCustomerById(customerId);
    if (!customer) {
      createError({ message: "this userId is not exist", statusCode: 200 });
    }
    delete customer.password;
    res.status(200).json({ customer });
  } catch (err) {
    next(err);
  }
};
module.exports = customerController;
