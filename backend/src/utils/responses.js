class ErrorResponse extends Error {
  constructor(message, statusCode) {
    super(message);
    this.statusCode = statusCode;
  }
}

const sendTokenResponse = (user, statusCode, res) => {
  const token = user.getSignedJwtToken();
  // To Store token in cookie
  const options = {
    expires: new Date(Date.now() + process.env.JWT_COOKIE_EXPIRE * 24 * 60 * 1000),
    httpOnly: true,
  };
  let roleId;
  let imageUrl = user.image;
  if (user.role === "user") {
    roleId = 1;
  } else {
    roleId = 2;
  }

  res.status(statusCode).json({ success: true, token, roleId, imageUrl, });
};

const clearImage = (filePath) => {
  filePath = path.join(__dirname, "../../public/img", filePath);
  fs.access(filePath, fs.constants.F_OK, (err) => {
    if (!err) {
      fs.unlink(filePath, (err) => {
        if (err) {
          console.error(err);
        }
      });
    } else {
      console.error('File does not exist');
    }
  });
};


module.exports = {ErrorResponse, sendTokenResponse};