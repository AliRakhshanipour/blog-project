const { Schema, Types, model } = require("mongoose");

const UserSchema = new Schema(
  {
    first_name: { type: String }, //optional
    last_name: { type: String }, //optional
    username: { type: String, unique: true, required: true, lowercase: true }, //username must be unique and required
    email: { type: String, unique: true, required: true, lowercase: true }, //email is required and unique
    password: { type: String, required: true }, //password is required
    token: { type: String, default: "" }, //Token in 1 week!
    avatar: { type: String, default: "" }, //Profile Image
    phone: { type: String, unique: true, default: "" }, //Phone Number must be unique
    role: { type: String, default: "USER" }, //USER or ADMIN,
  },
  {
    timestamps: true, //for created and updated times
  }
);

const UserModel = model("user", UserSchema);
module.exports = {
  UserModel,
};
