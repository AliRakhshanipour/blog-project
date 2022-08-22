const { AuthenticationController } = require("../http/controllers/auth.ctrl");
const {
  expressValidatorErrorMapper,
} = require("../http/middlewares/checkValidationErrors");
const { authValidator } = require("../http/validations/auth.vld");
const router = require("express").Router();

router.post(
  "/auth-user",
  authValidator(),
  expressValidatorErrorMapper,
  AuthenticationController.registerUser
);
router.post("/set-admin/:id", AuthenticationController.setAdmin);
module.exports = {
  authRoutes: router,
};
