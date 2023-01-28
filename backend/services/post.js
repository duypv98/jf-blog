/**
 * @typedef {{
 *  _id?: any;
 *  title: string;
 *  slug: string;
 *  excerpt: string;
 *  content: string;
 *  isPrivate: boolean;
 *  category: any;
 * }} Post
 */

import { PostModel } from "../models/post";
import dbConnect, { isValidObjectId, parseDoc } from "../utils/mongodb";

const postServices = {
  /**
   *
   * @param {{
   *  skip?: number;
   *  limit?: number;
   *  sortBy?: "createdAt" | "title",
   *  asc?: boolean;
   *  category?: string | null;
   *  owner?: string;
   * }} args
   * @returns
   */
  getList: async (args) => {
    const {
      skip = 0,
      limit = 10,
      sortBy = "createdAt",
      asc,
      category
    } = args;

    const filter = { deletedAt: { $exists: false } };
    if (typeof category !== "undefined"
      && (category === null || isValidObjectId(category))
    ) filter.category = category;

    await dbConnect();

    const posts = await PostModel
      .find(filter)
      .select("-content")
      .sort({ [`${sortBy}`]: asc ? 1 : -1 })
      .skip(skip)
      .limit(limit);

    const total = await PostModel.countDocuments(filter);

    return {
      total,
      data: posts.map((e) => parseDoc(e))
    };
  },

  /**
   *
   * @param {Omit<Post, "_id">} args
   */
  createOne: async (args) => {
    await dbConnect();
    if (!args.owner) return null;
    const newPost = await PostModel.create(args);
    return newPost;
  },

  getById: async (id) => {
    await dbConnect();
    if (!id || !isValidObjectId(id)) return null;
    const post = await PostModel.findOne({ _id: id, deletedAt: { $exists: false } });
    return post ? parseDoc(post) : null;
  },

  /**
   *
   * @param {{ _id: string} & Partial<Pick<Post, "title" | "slug" | "excerpt" | "content" | "isPrivate" | "category">} args
   */
  updateById: async (args) => {
    await dbConnect();
    const { _id, ...updates } = args;
    const update = {};
    Object.keys(updates || {}).forEach((key) => {
      if (typeof updates[key] !== "undefined" && key !== "deletedAt") update[key] = updates[key];
    });
    const newPost = await PostModel.findByIdAndUpdate(_id, { $set: { ...update } }, { new: true });
    return newPost;
  },

  deleteById: async (id) => {
    await dbConnect();
    const deleted = await PostModel.findByIdAndUpdate(id, { $set: { deletedAt: new Date() } }, { new: true });
    return deleted;
  }
}

export default postServices;