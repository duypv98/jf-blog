import { del, get, patch, post } from "../../utils/fetcher"

/**
 * @typedef {{
 *  _id?: string;
 *  title: string;
 *  slug: string;
 *  excerpt: string;
 *  content: string;
 *  isPrivate: boolean;
 *  category: string;
 *  owner: string;
 *  createdAt: string | Date;
 *  updatedAt: string | Date;
 * }} Post;
 * @param {Omit<Post, "_id" | "createdAt" | "updateAt">} args
 * @returns {Promise<Post>}
 */
export const apiCreatePost = async (args) => {
  const { data, error } = await post({ endpoint: "/api/posts", params: { type: "create_one" }, body: args, withAccessToken: true });
  return error ? null : data;
}

export const apiGetPostById = async (id) => {
  const { data, error } = await get({ endpoint: `/api/posts/${id}`, withAccessToken: true });
  return error ? null : data;
}

/**
 * @param {{ _id: string} & Partial<Pick<Post, "title" | "slug" | "excerpt" | "content" | "isPrivate" | "category">} args
 * @returns {Promise<Post>}
 */
export const apiUpdatePostById = async (args) => {
  const { _id, ...payload } = args;
  const { data, error } = await patch({ endpoint: `/api/posts/${_id}`, body: payload, withAccessToken: true });
  return error ? null : data;
}

export const apiDeletePostById = async (id) => {
  const { data } = await del({ endpoint: `/api/posts/${id}`, withAccessToken: true });
  return data;
}