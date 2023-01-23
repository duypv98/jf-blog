import { post } from "../../utils/fetcher"

/**
 *
 * @param {{
 *  account: string;
 *  password: string;
 * }} args
 * @returns {Promise<{
 *  name: string;
 *  accessToken: string;
 *  refreshToken: string;
 * }>}
 */
export const apiLogin = async (args) => {
  const { data, error } = await post({ endpoint: "/api/login", body: args, withCredentials: true });
  return error ? null : data;
}