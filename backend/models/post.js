import mongoose from "mongoose";
import { categoryTblName } from "./category";
import { userTblName } from "./user";

const postSchema = new mongoose.Schema({
  title: String,
  slug: String,
  excerpt: String,
  content: String,
  isPrivate: Boolean,
  deletedAt: Date,
  category: {
    type: mongoose.Types.ObjectId,
    ref: categoryTblName,
    default: null
  },
  owner: {
    type: mongoose.Types.ObjectId,
    ref: userTblName
  }
}, {
  versionKey: false,
  timestamps: true
});

export const postTblName = "Post";

export const PostModel = mongoose.models.Post || mongoose.model(postTblName, postSchema);