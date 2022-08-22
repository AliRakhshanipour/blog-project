const { hashStr } = require("../../../modules/tools");
const { UserModel } = require("../../models/user.mdl");

class AuthenticationController {
  async registerUser(req, res, next) {
    try {
      const { username, email, phone } = req.body;
      const password = hashStr(req.body.password);
      const user = await UserModel.create({ username, email, password, phone });
      if (!user)
        throw { status: 401, message: "user registration unsuccessful!!" };
      return res
        .status(200)
        .json({ status: 200, message: "User registration successful" });
    } catch (error) {
      next(error);
    }
  }
  async setAdmin(req, res, next) {
    try {
      const userID = req.params.id;
      const user = await UserModel.findOne({ _id: userID });
      if (!user) throw { status: 404, message: "user does not exist" };
      if (user.role == "ADMIN")
        throw {
          status: 404,
          message: "this user is already in the admin role",
        };
      const setAdminResult = await UserModel.updateOne(
        { _id: userID },
        {
          $set: {
            role: "ADMIN",
          },
        }
      );
      if (setAdminResult.modifiedCount == 0)
        throw { status: 404, message: "admin creation unsuccessful!!" };
      return res.status(200).json({
        status: 200,
        success: true,
        message: "admin registration successful",
      });
    } catch (error) {
      next(error);
    }
  }
  loginUser() {}
  logoutUser() {}
  resetUserPassword() {}
  deleteUserAccount() {}
}

module.exports = {
  AuthenticationController: new AuthenticationController(),
};
