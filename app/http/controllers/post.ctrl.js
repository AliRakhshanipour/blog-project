const { PostModel } = require("../../models/post.mdl");
class PostController {
  async createPost(req, res, next) {
    try {
      const { title, text } = req.body;
      const owner = req.user._id;
      const post = await PostModel.create({ title, text, owner });
      if (!post)
        throw { status: 400, message: "post does not create successfully" };
      return res.status(201).json({
        status: 201,
        success: true,
        message: "post created successfully",
      });
    } catch (error) {
      next(error);
    }
  }
  async getPosts(req, res, next) {
    try {
      const checkAdmin = req.user.role;
      if (checkAdmin != "ADMIN")
        throw {
          status: 400,
          message: "you don't have permission to access this page",
        };
      const posts = await PostModel.find({});
      if (!posts)
        throw { status: 400, message: "there is no post in database!!" };
      return res.status(200).json({
        status: 200,
        success: true,
        posts,
      });
    } catch (error) {
      next(error);
    }
  }
  async getPostById(req, res, next) {
    try {
      const checkAdmin = req.user.role;
      const postId = req.params.id;
      if (checkAdmin != "ADMIN")
        throw {
          status: 400,
          message: "you don't have permission to access this page",
        };
      const post = await PostModel.findOne({ _id: postId });
      if (!post)
        throw { status: 400, message: "there is no post with this id!!" };
      return res.status(200).json({ status: 200, success: true, post });
    } catch (error) {
      next(error);
    }
  }
  async getUserPost(req, res, next) {
    try {
      const postId = req.params.id;
      const owner = req.user._id;
      const post = await PostModel.findOne({ _id: postId, owner });
      if (!post)
        throw { status: 404, message: "there is no post with this id" };
      return res.status(200).json({ status: 200, success: true, post });
    } catch (error) {
      next(error);
    }
  }
  async addTagToPost(req, res, next) {
    try {
      const { tags } = req.body;
      const postId = req.params.id;
      const owner = req.user._id;
      const post = await PostModel.findOne({ owner, _id: postId });
      if (!post)
        throw {
          status: 404,
          message:
            "there is no post with this id or you do not have access to this post!!",
        };
      const addTagResult = await PostModel.updateOne(
        { _id: postId },
        { $set: { tags } }
      );
      if (addTagResult.modifiedCount == 0)
        throw { status: 404, message: "tag addition not completed!!" };
      return res.status(200).json({
        status: 200,
        success: true,
        message: "tag added successfully!",
      });
    } catch (error) {
      next(error);
    }
  }
  async editPost(req, res, next) {
    try {
      const { title, text } = req.body;
      const owner = req.user._id;
      const postId = req.params.id;
      const post = await PostModel.findOne({ _id: postId, owner });
      if (!post) throw { status: 400, message: "no post found with this id!!" };
      const editPostResult = await PostModel.updateOne(
        { _id: postId },
        { $set: { title, text } }
      );
      if (editPostResult.modifiedCount == 0)
        throw { status: 404, message: "post edition not successful!!" };
      return res.status(200).json({
        status: 200,
        success: true,
        message: "post edited successfully!!",
      });
    } catch (error) {
      next(error);
    }
  }
  async deletePost(req, res, next) {}
}

module.exports = {
  PostController: new PostController(),
};
