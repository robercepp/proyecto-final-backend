const multer = require("multer");

//storage local con multer
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, "./public/avatars");
    },
    filename: (req, file, cb) => {
      cb(null, file.originalname);
    },
  });
  const upload = multer({ storage: storage });

  module.exports = {upload}