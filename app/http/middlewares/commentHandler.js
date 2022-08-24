const { CommentModel } = require("../../models/comment.mdl");
const { PostModel } = require("../../models/post.mdl");

const addCommentToPost = async (req, res, next) => {
  try {
    const { text } = req.body;
    const postId = req.params.postId;
    const owner = req.user._id;

    const post = await PostModel.findOne({ _id: postId });
    if (!post) throw { status: 404, message: "no post found!!" };

    const comment = await CommentModel.create({ text, owner, postId });
    if (!comment) throw { status: 400, message: "comment did not submitted!!" };

    const updateResult = await PostModel.updateOne(
      { _id: postId },
      { $push: { comments: comment } }
    );

    console.log(updateResult);

    // const comments = post.comments;
    // comments.push(comment._id);
    next();
  } catch (error) {
    next(error);
  }
};

module.exports = {
  addCommentToPost,
};
