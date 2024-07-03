const dotenv = require('dotenv');
dotenv.config();
const mongoose = require('mongoose');

mongoose.set('strictQuery', true);
const mongoName = process.env.MONGODB_NAME; 

// const mongoUri = process.env.MONGODB_URI;
const mongoUri = process.env.ATLAS_URI;
let atlasLocal = mongoUri === process.env.ATLAS_URI ? 'Atlas' : `${mongoName}: local`;
mongoose.Promise = global.Promise; 
const options = {
  useNewUrlParser: true, useUnifiedTopology: true
};
const connectDB = async () => {
  try {
    await mongoose.connect(mongoUri, options);
    console.log(`connected to mongodb ${atlasLocal}`.cyan.underline.bold);
  } catch (err) {
    console.error(`error connecting to mongodb: `.red.bold, err);
  }
}

module.exports = connectDB;
