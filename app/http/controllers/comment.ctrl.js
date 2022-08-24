const { default: mongoose } = require("mongoose");
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
  async getCommentById(req, res, next) {
    try {
      const commentId = mongoose.Types.ObjectId(req.params.id);
      const owner = req.user._id;
      const comment = await CommentModel.aggregate([
        { $match: { owner, _id: commentId } },
        {
          $lookup: {
            from: "users",
            localField: "owner",
            foreignField: "_id",
            as: "owner",
          },
        },
      ]);
      if (!comment)
        throw {
          status: 400,
          message: "comment did not exist or was deleted!!",
        };
      return res.status(200).json({
        status: 200,
        success: true,
        comment,
      });
    } catch (error) {
      next(error);
    }
  }
  async getCommentsByUserId(req, res, next) {
    try {
      const owner = req.user._id;
      const comments = await CommentModel.find({ owner });
      if (!comments)
        throw { status: 400, message: "fetch comments unsuccessful!!" };
      return res.status(200).json({ status: 200, success: true, comments });
    } catch (error) {
      next(error);
    }
  }
  async deleteComment(req, res, next) {
    try {
      const owner = req.user._id;
      const commentId = req.params.id;
      const comment = await CommentModel.findOne({ owner, _id: commentId });
      if (!comment)
        throw {
          status: 400,
          message: "there is no comment to delete with this id!!",
        };
      const deleteResultComment = await CommentModel.deleteOne({
        owner,
        _id: comment,
      });
      if (deleteResultComment.deletedCount == 0)
        throw { status: 400, message: "no comment to delete!!" };
      return res.status(200).json({
        status: 200,
        success: true,
        message: "comment deleted successfully!!",
      });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = {
  CommentController: new CommentController(),
};
