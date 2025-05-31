require("dotenv").config();
const mongoose = require("mongoose");

async function resetIndexes() {
  await mongoose.connect(process.env.MONGO_URI);

  await mongoose.connection.db.collection("users").dropIndex("phone_1");

  await mongoose.connection.db
    .collection("users")
    .createIndex({ phone: 1 }, { unique: true, sparse: true });

  console.log("Indexes reset");
  await mongoose.disconnect();
}

resetIndexes().catch(console.error);
