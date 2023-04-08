import mongoose from "mongoose";

const connectMongoDb = async () => {
  const conn = await mongoose.connect(
    "mongodb+srv://mongoclusteruser:mypassword1234@testcluster.xlyxsig.mongodb.net/db?retryWrites=true&w=majority"
  );

  return console.info("MongoDB connected: ", conn.connections.length);
};

export default connectMongoDb;
