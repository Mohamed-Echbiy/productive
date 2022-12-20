const validate = require("validator");
const bcrypt = require("bcrypt");
const db = require("../schema/main");

const validator = async (email, password, res) => {
  try {
    const Email = validate.isEmail(email);
    if (!Email) {
      return res
        .status(401)
        .json({ msg: `sorry but this ${email} is not a valid one` });
    }
    const databasePass = await db.findOne({ email });
    if (!databasePass) {
      return res
        .status(401)
        .json({ msg: "we can't find any user with this email please signup" });
    }
    bcrypt.compare(password, databasePass.password).then((err, response) => {
      if (err) {
        return res.status(401).json({ msg: err.message });
      }
      if (!response) {
        return res.status(401).json({
          msg: "your password is incorrect please recheck and try again",
        });
      }
    });
  } catch (error) {
    res.status(401).json({ msg: error.message });
  }
};

module.exports = validator;
