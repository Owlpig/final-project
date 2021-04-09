const mongoose = require('mongoose');

const uri = ` mongodb+srv://admin:${process.env.DB_PWORD}@userdata.ftapv.mongodb.net/userInfo_db?retryWrites=true&w=majority`;

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(uri, {
      useUnifiedTopology: true,
      useNewUrlParser: true,
      useCreateIndex: true,
    });

    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.log(`Error: ${error.message}`);
    process.exit(1);
  }
};

module.exports = connectDB;
