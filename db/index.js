const mongoose = require('mongoose');

require('dotenv').config();

async function connect()
{
  try 
  {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Successfully Connected to DB');
  } 
  catch(error) 
  {
    console.error(error.message);
  }
}

connect();

module.exports = mongoose.connection;