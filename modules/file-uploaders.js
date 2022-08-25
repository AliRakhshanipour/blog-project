const multer = require("multer");
const fs = require("fs");
const path = require("path");
const { createPathDirectory } = require("./tools");

const storage = multer.diskStorage({
  destination: (req, file, callback) => {
    callback(null, createPathDirectory());
  },
  filename: (req, file, callback) => {
    const type = path.extname(file.originalname);
    const allowedTypes = ["jpeg", "jpg", "png"];
    if (allowedTypes.includes(type)) throw "file extname not allowed!!";
    callback(null, Date.now() + type);
  },
});

const upload_multer = multer({
  storage,
  fileFilter: (req, file, cb) => {
    if (
      file.mimetype == "image/png" ||
      file.mimetype == "image/jpg" ||
      file.mimetype == "image/jpeg"
    ) {
      cb(null, true);
    } else {
      cb(null, false);
      return cb(new Error("Only .png, .jpg and .jpeg format allowed!"));
    }
  },
});
module.exports = {
  upload_multer,
};
