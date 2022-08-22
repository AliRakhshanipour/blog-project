const { genSaltSync, hashSync } = require("bcrypt");

const hashStr = (str) => {
  const salt = genSaltSync(10);
  return hashSync(str, salt);
};
const tokenGenerator = () => {};
const checkTokenVerification = () => {};

module.exports = {
  hashStr,
};
