'use strict';

const express = require('express');

// Load models
const DraftModel = require('../routes/drafts/draft.model');
const PostModel = require('../routes/blogs/blog.model');
const UserModel = require('../routes/auth/user.model');

const dBaseSeed = express.Router();

// Populate database with JSON data: 
dBaseSeed.get('/populate-database', async (req, res) => {

  const draftData = require('./data/draft.data.json');
  const postData = require('./data/post.data.json');
  // const userData = require('./data/user.data.json');

  try {
    const draftSearch = await DraftModel.find()
    const postSearch = await PostModel.find();
    // const userSearch = await UserModel.find();

    let resultStr = '';
    const msg = 'collection occupied';
    (draftSearch.length === 0) ? await DraftModel.create(draftData) : resultStr += ` Drafts ${msg} \n `;
    (postSearch.length === 0) ? await PostModel.create(postData) : resultStr += ` Post ${msg} \n `;
    // (userSearch.length === 0) ? await UserModel.create(userData) : resultStr += ` User ${msg} `;
    if (resultStr) return res.send({ resultStr });

    res.send('Data Imported into db...');
  } catch (err) {
    console.error(err);
  }

});

dBaseSeed.get('/read-database', async (req, res) => {
  let draftData, postData, userData;

  try {
    postData = await PostModel.find();
    draftData = await DraftModel.find();
    userData = await UserModel.find();

    const readings = { userData, postData, draftData };
    console.log('Data read from database...', readings.userData);
    res.json({ userData, postData, draftData });
    // res.json({ userData });

  } catch (err) {
    console.error(err);
  }

});

dBaseSeed.post('/delete-database', async (req, res) => {
  try {
    await DraftModel.deleteMany();
    await PostModel.deleteMany();
    // await UserModel.deleteMany();
    const message = `UserModel Data Destroyed...`
    console.log(message);
    res.json(message);
  } catch (err) {
    console.error(err);
  }
});

dBaseSeed.get('/', (req, res) => res.send('Welcome to seeder endpoint'));

module.exports = dBaseSeed;
