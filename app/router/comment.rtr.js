const { CommentController } = require("../http/controllers/comment.ctrl");
const { checkUserLogin } = require("../http/middlewares/autoUserLogin");
const { addCommentToPost } = require("../http/middlewares/commentHandler");

const router = require("express").Router();

router.post(
  "/create-comment/:postId",
  checkUserLogin,
  addCommentToPost,
  CommentController.createComment
);

module.exports = {
  commentRoutes: router,
};
