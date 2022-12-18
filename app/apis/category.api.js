import { get } from "../../utils/fetcher";

export const apiGetListCategories = async () => {
  const { data, error } = await get({ endpoint: "/api/categories" });
  return error ? [] : data;
}