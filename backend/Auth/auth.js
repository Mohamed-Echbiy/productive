const jwt = require("jsonwebtoken");
require("dotenv").config();
const jwtDecoder = require("jwt-decode");

const setJwt = (user) => {
  // console.log(user);
  const { email, id } = user;
  const accessToken = jwt.sign(
    { email: email, id: id },
    process.env.SECRET_KEY
  );
  return accessToken;
};

const validateJwt = async (req, res, next) => {
  try {
    const accessToken = req.cookies["ACCESS-TOKEN"];
    console.log(req.cookies["ACCESS-TOKEN"]);
    if (!accessToken) {
      return res
        .status(401)
        .json({ msg: "your are not authorized please log-in" });
    }

    const validateJwt = jwt.verify(accessToken, process.env.SECRET_KEY);
    if (!validateJwt) {
      return res.status(401).json({ msg: "your token is not valid" });
    }
    const userId = jwtDecoder(accessToken);
    req.authorized = true;
    req.id = userId.id;
    next();
  } catch (error) {
    res.status(401).json({ msg: error.message });
  }
};

module.exports = { setJwt, validateJwt };
