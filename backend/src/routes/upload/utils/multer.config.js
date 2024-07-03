const multer = require('multer');

const diskStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'src/public/img/');
  },
  filename: (req, file, cb) => {
    cb(null, `${file.originalname}`);
  },
});

const fileFilter = (req, file, cb) => {
  if (
    file.mimetype === 'image/png' || file.mimetype === 'image/jpg' || file.mimetype === 'image/jpeg'
  ) {
    cb(null, true);
  } else {
    cb(new Error('Only image files are allowed!'), false);
  }
};

const configLocalStorage = multer({
  storage: diskStorage,
  limits: { fileSize: 500 * 1024 }, // 500kB limit
  fileFilter: fileFilter,
})
// .single('image');

const memoryStorage = multer.memoryStorage();

const configCloudinaryStorage = multer({
  storage: memoryStorage,
  limits: { fileSize: 500 * 1024 }, // 500kB limit
  fileFilter: fileFilter,
})
// .single('image');

module.exports = { configLocalStorage, configCloudinaryStorage };
