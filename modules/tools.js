const { genSaltSync, hashSync } = require("bcrypt");
const { sign, verify } = require("jsonwebtoken");

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
module.exports = {
  hashStr,
  tokenGenerator,
  checkTokenVerification,
};
