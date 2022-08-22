const { authRoutes } = require("./auth.rtr");
const { commentRoutes } = require("./comment.rtr");
const { postRoutes } = require("./post.rtr");
const { userRoutes } = require("./user.rtr");

const router = require("express").Router();

router.use("/auth", authRoutes);
router.use("/user", userRoutes);
router.use("/post", postRoutes);
router.use("/comment", commentRoutes);

module.exports = {
  AllRoutes: router,
};
