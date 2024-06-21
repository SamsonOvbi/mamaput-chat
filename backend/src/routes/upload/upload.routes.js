"use strict";

const dotenv = require('dotenv');
dotenv.config();

const express = require('express');
const { isAuth } = require('../auth/auth.middleware');
const { configLocalStorage, configCloudinaryStorage } = require('../../db/multer.config');
const uploadContr = require('./upload.controller');
const uploadRoute = express.Router();

uploadRoute.post('/singleLoocal', isAuth, configLocalStorage.single('image'), uploadContr.uploadSingleImageToStorage);
uploadRoute.post('/singleCloudinary', isAuth, configCloudinaryStorage.single('image'), uploadContr.uploadSingleImageToCloudinary);

uploadRoute.post('/many', uploadContr.uploadManyImagesToCloudinary);

module.exports = uploadRoute;
