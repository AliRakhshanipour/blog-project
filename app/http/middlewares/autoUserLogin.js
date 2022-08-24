const { checkTokenVerification } = require("../../../modules/tools");
const { UserModel } = require("../../models/user.mdl");

const checkUserLogin = async (req, res, next) => {
  try {
    const authorization = req?.headers?.authorization;
    if (!authorization)
      throw { status: 404, message: "please login to your account" };
    let token = authorization.split(" ")?.[1];
    if (!token)
      throw { status: 401, message: "please login to your account!!" };
    const { username } = checkTokenVerification(token);
    const user = await UserModel.findOne({ username }, { password: 0 });
    if (!user) throw { status: 404, message: "please login to your account" };
    req.user = user;
    next();
  } catch (error) {
    next(error);
  }
};

module.exports = {
  checkUserLogin,
};
