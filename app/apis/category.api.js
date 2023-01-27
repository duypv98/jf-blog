import { get, post } from "../../utils/fetcher";

export const apiGetListCategories = async () => {
  const { data, error } = await get({ endpoint: "/api/categories" });
  return error ? [] : data;
}

/**
 * @typedef {{ _id?: string; title: string; slug: string; tag?: string; }} Category
 * @param {Omit<Category, _id>} args
 * @returns {Promise<Category>}
 */
export const apiCreateCategory = async (args) => {
  const { data, error } = await post({ endpoint: "/api/categories", params: { type: "create_one" }, body: args, withAccessToken: true });
  return error ? null : data;
}