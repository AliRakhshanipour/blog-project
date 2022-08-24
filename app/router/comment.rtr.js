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
router.get(
  "/get-comment/:id",
  checkUserLogin,
  CommentController.getCommentById
);
router.get(
  "/get-user-comments",
  checkUserLogin,
  CommentController.getCommentsByUserId
);
router.delete(
  "/delete-comment/:id",
  checkUserLogin,
  CommentController.deleteComment
);
module.exports = {
  commentRoutes: router,
};
