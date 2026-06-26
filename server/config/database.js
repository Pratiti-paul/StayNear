// import mongoose from "mongoose";

// const connectDB = async () => {
//   try {
//     await mongoose.connect(process.env.MONGODB_URI);
//     console.log("MongoDB Connected");
//   } catch (error) {
//     console.error(error);
//     process.exit(1);
//   }
// };

// export default connectDB;

import mongoose from "mongoose";

const connectDB = async () => {
  try {
    console.log("MONGODB_URI =", process.env.MONGODB_URI);

    await mongoose.connect(process.env.MONGODB_URI);

    console.log("MongoDB Connected");
  } catch (err) {
    console.log(err);
  }
};

export default connectDB;