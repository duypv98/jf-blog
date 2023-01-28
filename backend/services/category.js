import { CategoryModel } from "../models/category";
import dbConnect, { parseDoc } from "../utils/mongodb";

const categoryServices = {
  getAll: async () => {
    await dbConnect();
    const categories = await CategoryModel.find();
    return categories.map((e) => parseDoc(e));
  },

  /**
   *
   * @param {{ title: string; slug: string; tag?: string; }} param0
   */
  createOne: async ({ title, slug, tag }) => {
    await dbConnect();
    const newCategory = await CategoryModel.create({ title, slug, tag });
    return newCategory;
  },

  /**
   *
   * @param {{ _id: string } & Partial<{ title: string; slug: strin; tag?: string; }>} param0
   */
  updateById: async ({ _id, ...updates }) => {
    await dbConnect();
    const update = {};
    Object.keys(updates || {}).forEach((key) => {
      if (typeof updates[key] !== "undefined") update[key] = updates[key];
    });
    const newCategory = await CategoryModel.findByIdAndUpdate(_id, update, { new: true });
    return newCategory;
  },

  deleteById: async (id) => {
    await dbConnect();
    const deleted = await CategoryModel.findByIdAndDelete(id);
    return deleted;
  },

  getBySlug: async (slug) => {
    await dbConnect();
    const category = await CategoryModel.findOne({ slug });
    return category ? parseDoc(category) : null;
  }
}

export default categoryServices;