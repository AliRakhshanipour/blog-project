const { CommentModel } = require("../../models/comment.mdl");

class CommentController {
  async createComment(req, res, next) {
    try {
      return res.status(200).json({
        status: 200,
        success: true,
        message: "comment submitted successfully!!",
      });
    } catch (error) {
      next(error);
    }
  }
  getCommentById() {}
  getUserComment() {}
  deleteComment() {}
}

module.exports = {
  CommentController: new CommentController(),
};
