const { checkUserLogin } = require("../http/middlewares/autoUserLogin");
const { PostController } = require("../http/controllers/post.ctrl");
const router = require("express").Router();
const { postValidator } = require("../http/validations/post.vld");
const {
  expressValidatorErrorMapper,
} = require("../http/middlewares/checkValidationErrors");
const { upload_multer } = require("../../modules/file-uploaders");

router.post(
  "/create",
  checkUserLogin,
  postValidator(),
  expressValidatorErrorMapper,
  PostController.createPost
);
router.post("/create-tag/:id", checkUserLogin, PostController.addTagToPost);
router.post(
  "/edit-post/:id",
  checkUserLogin,
  postValidator(),
  expressValidatorErrorMapper,
  PostController.editPost
);
router.post(
  "/upload-images/:id",
  checkUserLogin,
  upload_multer.array("images"),
  PostController.addImage
);

router.get("/get-posts", checkUserLogin, PostController.getPosts);
router.get("/get-post/:id", checkUserLogin, PostController.getPostById);
router.get("/getUserPost/:id", checkUserLogin, PostController.getUserPost);
router.delete("/delete-post/:id", checkUserLogin, PostController.deletePost);
module.exports = {
  postRoutes: router,
};
