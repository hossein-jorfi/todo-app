import mongoose from "mongoose";

async function connectDB() {
     if (mongoose.connections[0].readyState) return true;
     console.log('Connecting');
     mongoose.set("strictQuery", false);
     await mongoose.connect(process.env.DB_URI);
     console.log("Connected to DB");
     return true
}

export default connectDB;