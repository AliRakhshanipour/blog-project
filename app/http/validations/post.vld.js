const { body } = require("express-validator");
const { PostModel } = require("../../models/post.mdl");
const postValidator = () => {
  return [
    body("title").custom(async (title) => {
      const post = await PostModel.findOne({ title });
      if (post) throw "there is another post with the same title!!";

      return true;
    }),
    body("text").notEmpty().withMessage("text can't be empty"),
  ];
};

module.exports = {
  postValidator,
};
