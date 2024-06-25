exports.getImgPath = (req, imgName) => {
  return `${req.protocol}://${req.hostname}/${imgName}`;
};
