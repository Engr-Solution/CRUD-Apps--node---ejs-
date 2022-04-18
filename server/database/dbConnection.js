const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    const _connectDB = await mongoose.connect(process.env.DBCONNECTION, {
      useNewUrlparser: true,
        // useUnifiedTopology: true,
        // useFindAndModify: false,
        // userCreateIndex: true,
    });
    console.log(`DB connected to ${_connectDB.connection.host}`);
  } catch (err) {
    console.log(err);
    process.exit(1);
  }
};

module.exports = connectDB;
