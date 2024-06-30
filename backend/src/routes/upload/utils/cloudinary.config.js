"use strict";

const dotenv = require('dotenv');
dotenv.config();

const fs = require('fs');
const path = require('path');
const cloudinary = require('cloudinary').v2;
const streamifier = require('streamifier');

const cloudinaryConfig = {
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
};

cloudinary.config(cloudinaryConfig);

const uploadCloudinaryImage = (file) => {
  const originalName = file.originalname;

  return new Promise((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream(
      {
        resource_type: 'image',
        public_id: `mama_blog/${originalName}`, // Using original filename as public_id
        use_filename: true,
        unique_filename: false,
        timeout: 120000
      },
      (error, result) => {
        if (error) {
          reject(error);
        } else {
          resolve(result);
        }
      }
    );

    const readStream = streamifier.createReadStream(file.buffer);
    readStream.on('error', (error) => {
      console.error("Stream error:", error);
      reject(error);
    });

    readStream.pipe(stream);
  });
};

const uploadManyCloudinaryImages = async () => {
  const directoryPath = path.join(__dirname, '../public/img');
  const files = await fs.promises.readdir(directoryPath);
  let results = []; // Array to store results of each file upload

  for (const file of files) {
    let filePath = path.join(directoryPath, file);
    if (path.extname(file).match(/\.(jpg|jpeg|png|gif)$/)) {
      try {
        const result = await cloudinary.uploader.upload(filePath, {
          resource_type: 'image',
          // public_id: `mama_blog/${file.originalname}`,
          public_id: `mama_blog/${file}`,
          use_filename: true,
          unique_filename: false,
          timeout: 120000
        });
        results.push({ file: file, status: 'success', result: result });
      } catch (uploadError) {
        console.error('Upload error:', uploadError);
        results.push({ file: file, status: 'error', error: uploadError });
      }
    } else {
      results.push({ file: file, status: 'error', error: 'Invalid file type' });
    }
  }
  return results;
};

module.exports = { uploadCloudinaryImage, uploadManyCloudinaryImages };


// const dotenv = require("dotenv");
// dotenv.config();

// const cloudinary = require('cloudinary').v2;
// const { CloudinaryStorage } = require('multer-storage-cloudinary');

// // Configure Cloudinary
// cloudinary.config({
//   cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
//   api_key: process.env.CLOUDINARY_API_KEY,
//   api_secret: process.env.CLOUDINARY_API_SECRET,
// });

// // Configure Multer Storage
// const cloudinaryStorage = new CloudinaryStorage({
//   cloudinary,
//   params: {
//     folder: 'your-folder-name', // Specify the folder name in Cloudinary
//     allowed_formats: ['png', 'jpg', 'jpeg'], // Allowed file formats
//   },
// });

// module.exports = cloudinaryStorage;
