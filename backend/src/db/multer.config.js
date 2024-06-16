const multer = require('multer');

const multerStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    const ext = file.originalname.split('.')[1];
    cb(null, `admin-${file.fieldname}-${Date.now()}.${ext}`);
  },
});

const memoryStorage = multer.memoryStorage();

const fileFilter = (req, file, cb) => {
  if (
    file.mimetype === 'image/png' ||
    file.mimetype === 'image/jpg' ||
    file.mimetype === 'image/jpeg'
  ) {
    cb(null, true);
  } else {
    cb(new Error('Only image files are allowed!'), false);
  }
};

const configLocalStorage = multer({
  storage: multerStorage,
  limits: { fileSize: 300 * 1024 }, // 300kB limit
  fileFilter: fileFilter,
})
// .single('image');

const configCloudinaryStorage = multer({
  storage: memoryStorage,
  limits: { fileSize: 300 * 1024 }, // 300kB limit
  fileFilter: fileFilter,
  limits: { fileSize: 5000000 },
})
// .single('image');

module.exports = { configLocalStorage, configCloudinaryStorage };
