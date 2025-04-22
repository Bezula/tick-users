import mongoose from "mongoose";
import app from "./app";

const port = process.env?.PORT ?? 8080;

const start = async () => {
  if (!process.env?.JWT_KEY) {
    throw new Error("JWT_KEY not found");
  }

  try {
    await mongoose.connect(process.env.MONGO_URI!);

    console.log("Connected to database");
  } catch (err) {
    console.error(err);
  }

  app.listen(port, () => {
    console.log(`Listening on ports ${port}`);
  });
};

start();
