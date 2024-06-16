const dotenv = require("dotenv");
dotenv.config();

const cloudinary = require('cloudinary').v2;
const { CloudinaryStorage } = require('multer-storage-cloudinary');

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Configure Multer Storage
const cloudinaryStorage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: 'your-folder-name', // Specify the folder name in Cloudinary
    allowed_formats: ['png', 'jpg', 'jpeg'], // Allowed file formats
  },
});

module.exports = cloudinaryStorage;
