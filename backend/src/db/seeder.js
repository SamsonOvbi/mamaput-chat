'use strict';

const express = require('express');

// Load models
// const DraftPostModel = require('../routes/drafts/draft.model');
const PostModel = require('../routes/blogs/blog.model');
const UserModel = require('../routes/auth/user.model');

const dBaseSeed = express.Router();

// Populate database with JSON data: 
dBaseSeed.post('/populate-database', async (req, res) => {
// dBaseSeed.get('/populate-database', async (req, res) => {

  // const draftPostData = require('./data/draftPosts.json');
  // const postData = require('./data/posts.data.json');
  const userData = require('./data/user.data.json');

  try {
    // await DraftPostModel.create(draftPostData);
    // await PostModel.create(postData);
    await UserModel.create(userData);

    res.send('Data Imported into db...');
  } catch (err) {
    console.error(err); 
  }
  
}); 

dBaseSeed.get('/read-database', async (req, res) => {
  let draftPostData, postData, productData, userData;

  try {
    // postData = await PostModel.find();
    // draftPostData = await DraftPostModel.find();
    // productData = await ProductModel.find();
    userData = await UserModel.find();

    const readings = { postData, draftPostData, productData, userData }
    // console.log('Data read from database...', readings.userData);
    res.json({ postData, userData });
    // res.json(readings.postData, readings.productData, readings.userData, readings.cartData);

  } catch (err) {
    console.error(err);
  }

});

dBaseSeed.post('/delete-database', async (req, res) => {
// dBaseSeed.get('/delete-database', async (req, res) => {
  try {
    // await PostModel.deleteMany();
    // await DraftPostModel.deleteMany();
    // await ProductModel.deleteMany();
    await UserModel.deleteMany();
    const message = `UserModel Data Destroyed...`
    console.log(message);
    res.json(message);
  } catch (err) {
    console.error(err);
  }
});

dBaseSeed.get('/', (req, res) => res.send('Welcome to seeder endpoint'));

module.exports = dBaseSeed;
