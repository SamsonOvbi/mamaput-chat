"use strict";

const dotenv = require('dotenv');
dotenv.config();

const express = require('express');
const { isAuth } = require('../middleware/auth.middleware');

const uploadRoute = express.Router();

const { configLocalStorage, configCloudinaryStorage } = require('../db/multer.config');
const uploadContr = require('../controllers/upload.controller');

uploadRoute.post('/singleLoocal', isAuth, configLocalStorage.single('image'), uploadContr.uploadSingleImageToStorage);
uploadRoute.post('/singleCloudinary', isAuth, configCloudinaryStorage.single('image'), uploadContr.uploadSingleImageToCloudinary);

uploadRoute.post('/many', uploadContr.uploadManyImagesToCloudinary);

module.exports = uploadRoute;
