import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  account: String,
  password: String,
  name: String
}, {
  versionKey: false
});

export const userTblName = "User";

export const UserModel = mongoose.models.User || mongoose.model(userTblName, userSchema);