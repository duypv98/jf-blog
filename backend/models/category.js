import mongoose from "mongoose";

const categorySchema = new mongoose.Schema({
  title: String,
  slug: String,
  tag: String
}, {
  versionKey: false
});

export const categoryTblName = "Category";

export const CategoryModel = mongoose.models.Category || mongoose.model(categoryTblName, categorySchema);