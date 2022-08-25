const { Types } = require("mongoose");
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
      const pID = new Types.ObjectId(postId);

      if (checkAdmin != "ADMIN")
        throw {
          status: 400,
          message: "you don't have permission to access this page",
        };
      // const post = await PostModel.findOne({ _id: postId });
      const post = await PostModel.aggregate([
        {
          $match: { _id: pID },
        },
        {
          $lookup: {
            from: "users",
            localField: "owner",
            foreignField: "_id",
            as: "owner",
          },
        },
        {
          $lookup: {
            from: "comments",
            localField: "comments",
            foreignField: "_id",
            as: "comments",
          },
        },
        {
          $project: {
            "owner.password": 0,
            "owner.token": 0,
            "owner.role": 0,
            "comments._id": 0,
            "comments.postId": 0,
          },
        },
        {
          $unwind: "$owner",
        },
      ]);

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
  async deletePost(req, res, next) {
    try {
      const postId = req.params.id;
      const owner = req.user._id;
      const post = await PostModel.findOne({ owner, _id: postId });
      if (!post)
        throw {
          status: 404,
          message: "no post found or you do not have access to this post!!",
        };
      const deletePostResult = await PostModel.deleteOne({
        owner,
        _id: postId,
      });
      if (deletePostResult.deletedCount == 0)
        throw {
          status: 400,
          message: "post did not delete successfully!!",
        };
      return res.status(200).json({
        status: 200,
        success: true,
        message: "post deleted successfully!!",
      });
    } catch (error) {
      next(error);
    }
  }
  async addImage(req, res, next) {
    try {
      const owner = req.user._id;
      const postId = req.params.id;
      if (Object.keys(req.files).length == 0)
        throw {
          status: 400,
          message: "please select an image file",
        };

      files.forEach(async (file) => {
        const filePath = file.path.split("public/")[1];

        const result = await PostModel.updateOne(
          { owner, _id: postId },
          { $push: { images: filePath } }
        );
        if (result.modifiedCount == 0)
          throw { status: 400, message: "image(s) did not upload!!" };
      });

      return res.status(200).json({
        status: 200,
        success: true,
        message: "image(s) uploaded to the post successfully!!",
      });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = {
  PostController: new PostController(),
};
