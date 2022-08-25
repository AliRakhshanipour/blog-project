const { genSaltSync, hashSync } = require("bcrypt");
const { sign, verify } = require("jsonwebtoken");
const path = require("path");
const fs = require("fs");
const hashStr = (str) => {
  const salt = genSaltSync(10);
  return hashSync(str, salt);
};
const tokenGenerator = (payload) => {
  return sign(payload, process.env.SECRET_KEY, {
    expiresIn: "14 days",
  });
};
const checkTokenVerification = (token) => {
  const result = verify(token, process.env.SECRET_KEY);
  if (!result?.username)
    throw { status: 404, message: "Please login to your account!!" };
  return result;
};

const createPathDirectory = () => {
  let date = new Date();
  let year = "" + date.getFullYear();
  let month = date.getMonth() + "";
  let day = "" + date.getDate();
  const uploadPath = path.join(
    __dirname,
    "..",
    "public",
    "uploads",
    year,
    month,
    day
  );
  fs.mkdirSync(uploadPath, { recursive: true });
  return uploadPath;
};
createPathDirectory();
module.exports = {
  hashStr,
  tokenGenerator,
  checkTokenVerification,
  createPathDirectory,
};
