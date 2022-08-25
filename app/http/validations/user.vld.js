const { body } = require("express-validator");
const { UserModel } = require("../../models/user.mdl");

const editUserValidator = () => {
  return [
    body("first_name")
      .notEmpty()
      .withMessage("can't be empty")
      .isLength({ min: 6, max: 16 })
      .withMessage("must be at between 6 and 16 characters"),
    body("last_name")
      .notEmpty()
      .withMessage("can't be empty")
      .isLength({ min: 6, max: 16 })
      .withMessage("must be at between 6 and 16 characters"),
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
    body("password")
      .isLength({ min: 6 })
      .withMessage("password must be at least 6 characters")
      .notEmpty()
      .withMessage("password can not be empty")
      .custom((password, cnx) => {
        const passwordRegex = /^[a-z]+[a-zA-Z0-9\_\@\*\.]{5,}$/;
        if (!passwordRegex.test(password))
          throw { status: 401, message: "Please enter a valid password..!!" };
        return true;
      }),
  ];
};

module.exports = {
  editUserValidator,
};
