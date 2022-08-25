const { hashStr } = require("../../../modules/tools");
const { UserModel } = require("../../models/user.mdl");
class UserController {
  async getProfile(req, res, next) {
    try {
      const userId = req.user._id;
      const user = await UserModel.findOne({ _id: userId });
      if (!user) throw { status: 404, message: "user does not exist" };
      return res.status(200).json({ status: 200, success: true, user });
    } catch (error) {
      next(error);
    }
  }
  async editProfile(req, res, next) {
    try {
      const userId = req.user._id;
      const { first_name, last_name, username, password } = req.body;
      const _password = hashStr(password);
      const user = await UserModel.findOne({ _id: userId });
      if (!user) throw { status: 401, message: "user does not exist" };
      const editResult = await UserModel.updateOne(
        { _id: userId },
        { first_name, last_name, username, password: _password }
      );
      if (editResult.modifiedCount == 0)
        throw { status: 401, message: "user update failed!!" };
      return res.status(200).json({
        status: 200,
        success: true,
        message: "user updated successfully!!",
      });
    } catch (error) {
      next(error);
    }
  }
  async addAvatar(req, res, next) {
    try {
      return res
        .status(200)
        .json({ status: 200, success, message: "avatar added successfully!" });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = {
  UserController: new UserController(),
};
