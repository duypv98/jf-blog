import { get } from "../../utils/fetcher";

/**
 *
 * @param {string} path
 * @returns {Promise<{ revalidate: boolean }>}
 */
export const apiRevalidate = async (path) => {
  const { data, error } = await get({ endpoint: "/api/revalidate", params: { path }, encodeParams: false, withAccessToken: true });
  return error ? false : !!data?.revalidated;
}