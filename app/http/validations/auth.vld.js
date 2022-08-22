const { body } = require("express-validator");
const { UserModel } = require("../../models/user.mdl");

const authValidator = () => {
  return [
    body("username")
      .isLength({ min: 6 })
      .withMessage("username must be at least 6 characters")
      .custom(async (username) => {
        const user = await UserModel.findOne({ username });
        if (user) throw "user already exists , Try another username!!";
        const regexUsername = /^[a-zA-Z]+[a-z0-9\_\.]{5,}$/gim;
        if (!regexUsername.test(username))
          throw { status: 401, message: "please enter a valid username" };
        return true;
      }),
    body("email")
      .isEmail()
      .withMessage("please enter a valid email!!")
      .custom(async (email) => {
        const user = await UserModel.findOne({ email });
        if (user)
          throw {
            status: 401,
            message: "this email address is already in use!!",
          };
        return true;
      }),
    body("phone")
      .isMobilePhone("fa-IR")
      .withMessage("Please enter a valid phone number!!")
      .custom(async (phone, context) => {
        const user = await UserModel.findOne({ phone });
        if (user) throw "phone number already exists!!";
        return true;
      }),
    body("password")
      .isLength({ min: 6 })
      .withMessage("password must be at least 6 characters")
      .notEmpty()
      .withMessage("password can not be empty")
      .custom((password, cnx) => {
        const passwordRegex = /^[a-z]+[a-zA-Z0-9\_\@\*\.]{5,}/;
        if (!passwordRegex.test(password))
          throw { status: 401, message: "Please enter a valid password..!!" };
        if (password != cnx.req?.body?.confirm_password)
          throw {
            status: 401,
            message: "password and confirmation does not match!",
          };
        return true;
      }),
  ];
};

module.exports = {
  authValidator,
};
