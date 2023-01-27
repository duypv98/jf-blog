import { CategoryModel } from "../models/category";
import dbConnect, { parseDoc } from "../utils/mongodb"

export default {
  getAll: async () => {
    await dbConnect();
    const categories = await CategoryModel.find();
    return categories.map((e) => parseDoc(e));
  },

  /**
   *
   * @param {{ title: string; slug: strin; tag?: string; }} param0
   */
  createOne: async ({ title, slug, tag }) => {
    await dbConnect();
    const newCategory = await CategoryModel.create({ title, slug, tag });
    return newCategory;
  }
}