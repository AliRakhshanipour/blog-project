const { AuthenticationController } = require("../http/controllers/auth.ctrl");
const { checkUserLogin } = require("../http/middlewares/autoUserLogin");
const {
  expressValidatorErrorMapper,
} = require("../http/middlewares/checkValidationErrors");
const {
  authValidator,
  loginValidator,
} = require("../http/validations/auth.vld");
const router = require("express").Router();

router.post(
  "/auth-user",
  authValidator(),
  expressValidatorErrorMapper,
  AuthenticationController.registerUser
);
router.post(
  "/login",
  loginValidator(),
  expressValidatorErrorMapper,
  AuthenticationController.loginUser
);
router.post("/set-admin/:id", AuthenticationController.setAdmin);

router.get(
  "/get-user/:id",
  checkUserLogin,
  AuthenticationController.getUserById
);
module.exports = {
  authRoutes: router,
};
