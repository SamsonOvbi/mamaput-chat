"use strict";

const dotenv = require('dotenv');
dotenv.config();

const asyncHandler = require('express-async-handler');
const { uploadCloudinaryImage, uploadManyCloudinaryImages } = require('./utils/cloudinary.config');
const uploadContr = {};

uploadContr.uploadSingleImageToStorage = asyncHandler(async (req, res) => {
  try {
    let filePath = '';
    if (req.file.path) {
      filePath = req.file.path.split('\\');
      filePath = filePath[filePath.length - 1];
    }
    const secure_url = `${process.env.API_URI}/img/${filePath}`;
    res.send({ secure_url });
  } catch (error) {
    console.error("Upload failed:", error);
    res.status(500).send("An error occurred during the image upload.");
  }
});

uploadContr.uploadSingleImageToCloudinary = asyncHandler(async (req, res) => {
  if (!req.file) {
    return res.status(400).send("No file provided.");
  }
  try {
    const result = await uploadCloudinaryImage(req.file);
    res.send(result);
  } catch (error) {
    console.error("Upload failed:", error);
    res.status(500).send("An error occurred during the image upload.");
  }
});

uploadContr.uploadManyImagesToCloudinary = asyncHandler(async (req, res) => {
  try {
    const results = await uploadManyCloudinaryImages();
    res.send(results); // Send all results back in one response
  } catch (err) {
    console.error('Error getting directory information or uploading files:', err);
    res.status(500).send({ message: "An error occurred during the image upload.", error: err });
  }
});

module.exports = uploadContr;
