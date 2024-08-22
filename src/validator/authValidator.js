const yup = require("yup");
require("yup-password")(yup);

exports.registerSchema = yup.object({
  name: yup.string().required("name is required"),
  email: yup.string().required("email is required").email("this is not valid form of email"),
  password: yup.string().required("password is required").min(8).minLowercase(1, "ต้องมีตัวอักษรพิมพ์เล็กอย่างน้อย 1 ตัว").minUppercase(1, "ต้องมีตัวอักษรพิมพ์ใหญ่อย่างน้อย 1 ตัว"),
  confirmPassword: yup
    .string()
    .required("Confirm Password is required")
    .oneOf([yup.ref("password")], "Passwords must match"),
  roleId: yup.number().required("role is required").positive().integer(),
});

exports.registerCustomerSchema = yup.object({
  firstName: yup.string().required("firstName is required"),
  lastName: yup.string().required("lastName is required"),
  email: yup.string().required("email is required").email("this is not valid form of email"),
  address: yup.string().required("address is required"),
  password: yup.string().required("password is required").min(8).minLowercase(1, "ต้องมีตัวอักษรพิมพ์เล็กอย่างน้อย 1 ตัว").minUppercase(1, "ต้องมีตัวอักษรพิมพ์ใหญ่อย่างน้อย 1 ตัว"),
  confirmPassword: yup
    .string()
    .required("Confirm Password is required")
    .oneOf([yup.ref("password")], "Passwords must match"),
});

exports.loginSchema = yup.object({
  email: yup.string().required("email is required").email("this is not valid form of email"),
  password: yup.string().required("password is required"),
});
