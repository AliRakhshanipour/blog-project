const { upload_multer } = require("../../modules/file-uploaders");
const { UserController } = require("../http/controllers/user.ctrl");
const { checkUserLogin } = require("../http/middlewares/autoUserLogin");
const {
  expressValidatorErrorMapper,
} = require("../http/middlewares/checkValidationErrors");
const { editUserValidator } = require("../http/validations/user.vld");

const router = require("express").Router();

router.get("/get-profile", checkUserLogin, UserController.getProfile);
router.post(
  "/user-update-profile",
  checkUserLogin,
  editUserValidator(),
  expressValidatorErrorMapper,
  UserController.editProfile
);
router.post(
  "/upload-avatar",
  checkUserLogin,
  upload_multer.single("image"),
  UserController.addAvatar
);

module.exports = {
  userRoutes: router,
};
