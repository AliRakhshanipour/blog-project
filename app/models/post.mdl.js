const { Schema, Types, model } = require("mongoose");

const PostSchema = new Schema(
  {
    title: { type: String, required: true }, //title is required
    text: { type: String, required: true }, //text is required
    tags: { type: [String], default: [] }, //tags is optional and is string array
    images: { type: [String], default: [] }, //images is optional and is string array
    owner: { type: Types.ObjectId, required: true }, //owner is required
    comments: { type: [Types.ObjectId], default: [] }, //comments are optional and is string array
  },
  {
    timestamps: true,
  }
);

const PostModel = model("post", PostSchema);
module.exports = {
  PostModel,
};
