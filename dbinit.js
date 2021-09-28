const mongoose = require('mongoose');

const connectDB = async () => {
 

  const conn = await mongoose.connect(process.env.MONGO_URI);
  //conn.connection.on('error', console.error.bind(console, 'MongoDB connection error:'));
  
  console.log(`Mongo DB connected ${conn.connection.host}`);
}

module.exports = connectDB;
