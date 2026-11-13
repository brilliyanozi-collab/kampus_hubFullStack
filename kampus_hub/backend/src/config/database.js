const mongoose = require('mongoose');
require('dotenv').config();

const dbURI = process.env.MONGODB_URI || 'mongodb://localhost:27017/kampushub';

async function connectDB() {
  await mongoose.connect(dbURI);
  console.log('MongoDB connected...');
}

module.exports = connectDB;