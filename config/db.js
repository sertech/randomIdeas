const mongoose = require('mongoose');

// mongoose.connect returns a promise and pass to it MONGO_URI in .env file
const connectDB = async () => {
    const conn = await mongoose.connect(process.env.MONGO_URI);
    console.log(`MongoDB connected ${conn.connection.host}`);
};

mongoose.set('strictQuery', true);

module.exports = connectDB;
