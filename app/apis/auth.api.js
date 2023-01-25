import { get, post } from "../../utils/fetcher"

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
  const { data, error } = await post({ endpoint: "/api/login", body: args });
  return error ? null : data;
}

export const apiGetMe = async () => {
  const { data, error } = await get({ endpoint: "/api/users/me", withAccessToken: true });
  return error ? null : data;
}
