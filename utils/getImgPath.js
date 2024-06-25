require("dotenv").config();

const port = process.env.PORT;

exports.getImgPath = (req, imgName) => {
  return `${req.protocol}://${req.hostname}:${port}/${imgName}`;
};
