import mongoose from "mongoose";
import { categoryTblName } from "./category";

const postSchema = new mongoose.Schema({
  title: String,
  slug: String,
  content: String,
  private: Boolean,
  deletedAt: Date,
  category: {
    type: mongoose.Types.ObjectId,
    ref: categoryTblName
  }
}, {
  versionKey: false
});

export const postTblName = "Post";

export const PostModel = mongoose.models.Post || mongoose.model(postTblName, postSchema);