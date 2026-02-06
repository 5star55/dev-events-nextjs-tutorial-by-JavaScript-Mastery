import mongoose from "mongoose";

await mongoose.connect(
  "mongodb+srv://USERNAME:PASSWORD@cluster0.sajfymh.mongodb.net/dev-event"
);

console.log("CONNECTED");
