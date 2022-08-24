const { checkUserLogin } = require("../http/middlewares/autoUserLogin");
const { PostController } = require("../http/controllers/post.ctrl");
const router = require("express").Router();
const { postValidator } = require("../http/validations/post.vld");
const {
  expressValidatorErrorMapper,
} = require("../http/middlewares/checkValidationErrors");

router.post(
  "/create",
  checkUserLogin,
  postValidator(),
  expressValidatorErrorMapper,
  PostController.createPost
);
router.post("/create-tag/:id", checkUserLogin, PostController.addTagToPost);
router.get("/get-posts", checkUserLogin, PostController.getPosts);
router.get("/get-post/:id", checkUserLogin, PostController.getPostById);
router.get("/getUserPost/:id", checkUserLogin, PostController.getUserPost);
module.exports = {
  postRoutes: router,
};
