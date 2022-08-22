const { Schema, Types, model } = require("mongoose");

const CommentSchema = new Schema(
  {
    text: { type: "string", required: true }, //text is required
    owner: { type: Types.ObjectId, required: true }, //owner is required
    post: { type: Types.ObjectId, required: true }, //post is required
  },
  {
    timestamps: true,
  }
);

const CommentModel = model("comment", CommentSchema);
module.exports = {
  CommentModel,
};
