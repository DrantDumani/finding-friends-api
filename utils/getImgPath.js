// Port number must be included when accessing web app from localhost during development.

exports.getImgPath = (req, imgName) => {
  const hostname =
    req.hostname === "localhost"
      ? `${req.hostname}:${process.env.PORT}`
      : req.hostname;
  return `${req.protocol}://${hostname}/${imgName}`;
};
