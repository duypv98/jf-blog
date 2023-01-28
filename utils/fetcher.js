import fetch from "isomorphic-fetch";
import qs from "query-string";
import { UnauthorizedErrorData } from "./config";

const apiHost = process.env.NEXT_PUBLIC_ENDPOINT || 'http://localhost:3000';

class FetchError extends Error {
  constructor(msg) {
    super();
    this.name = "FetchError";
    this.message = msg ?? "";
  }
}

const defaultHeaders = {
  "Content-Type": "application/json",
  Accept: "application/json"
}

/**
 *
 * @param {Response} response
 * @param {"json" | "buffer" | "text"} responseType
 * @returns
 */
const getResponseData = (response, responseType) => {
  return responseType === "buffer"
    ? response.arrayBuffer()
    : (responseType === "text" ? response.text() : response.json())
}

/**
 * @typedef {{
 * endpoint: string;
 * method: "GET" | "POST" | "PATCH" | "DELETE";
 * body?: any;
 * customHeaders?: Record<string, string>;
 * bodyType?: "json" | "multipart",
 * responseType?: "json" | "buffer" | "text";
 * withCredentials?: boolean;
 * withAccessToken?: boolean;
 * }} RequestData
 */

/**
 * @param {RequestData} args
 * @returns {Promise<{
 * data: any;
 * error: boolean;
 * headers: any;
 * }>}
 */
const request = async (args) => {
  const {
    endpoint,
    method = "GET",
    body,
    customHeaders = {},
    withCredentials = false,
    bodyType = "json",
    responseType = "json",
    withAccessToken
  } = args;
  let _endpoint = endpoint;
  if (!endpoint.startsWith("http")) {
    _endpoint = `${apiHost}${endpoint}`;
  }
  /**
   * @type {RequestInit["headers"]}
   */
  const headers = {
    ...defaultHeaders,
    ...customHeaders
  };
  if (withAccessToken) {
    const accessToken = localStorage.getItem("x-access-token");
    if (accessToken) {
      headers.authorization = `Bearer ${accessToken}`;
    }
  }
  if (method === "POST" && bodyType === "multipart") headers["Content-Type"] = "multipart/form-data";
  const config = {
    method,
    headers,
    body: body ? (bodyType === "multipart" ? body : JSON.stringify(body)) : null,
    credentials: withCredentials ? "include" : "omit"
  }
  try {
    const response = await fetch(_endpoint, config);
    const data = await getResponseData(response, responseType);
    if (response.status === 401 && data?.data === UnauthorizedErrorData.TOKEN_EXPIRED) {
      const refreshToken = localStorage.getItem("x-refresh-token");
      if (refreshToken) {
        // eslint-disable-next-line no-use-before-define
        const refreshTokenData = await post({ endpoint: "/api/refresh-token", body: { refreshToken } });
        if (refreshTokenData?.data) {
          const { accessToken, refreshToken } = refreshTokenData?.data;
          localStorage.setItem("x-access-token", accessToken);
          localStorage.setItem("x-refresh-token", refreshToken);

          config.headers.authorization = `Bearer ${accessToken}`;
          const newResponse = await fetch(_endpoint, config);
          const data = await getResponseData(newResponse, responseType);
          return {
            error: newResponse.status !== 200,
            data,
            headers: newResponse.headers
          }
        }
      }
    }
    return {
      error: response.status !== 200,
      data,
      headers: response.headers
    }
  } catch (error) {
    throw new FetchError(error?.message ?? "Unexpected Error");
  }
}

/**
 * @param {Omit<RequestData, "method" | "body"> & { params?: any }} args;
 *
 */
export const get = (args) => {
  const { endpoint, params, ...rest } = args;
  let _endpoint = endpoint;
  if (params && !(params.constructor === Object && !Object.keys(params).length)) {
    _endpoint += `?${qs.stringify(params, { encode: true })}`;
  }
  return request({ endpoint: _endpoint, ...rest });
}

/**
 * @param {Omit<RequestData, "method"> & { params?: any }} args
 */
export const post = (args) => {
  const { endpoint, params, ...rest } = args;
  let _endpoint = endpoint;
  if (params && !(params.constructor === Object && !Object.keys(params).length)) {
    _endpoint += `?${qs.stringify(params, { encode: true })}`;
  }
  return request({ method: "POST", endpoint: _endpoint, ...rest });
}

/**
 * @param {Omit<RequestData, "method"> & { params?: any }} args
 */
export const patch = (args) => {
  const { endpoint, params, ...rest } = args;
  let _endpoint = endpoint;
  if (params && !(params.constructor === Object && !Object.keys(params).length)) {
    _endpoint += `?${qs.stringify(params, { encode: true })}`;
  }
  return request({ method: "PATCH", endpoint: _endpoint, ...rest });
}

/**
 * @param {Omit<RequestData, "method"> & { params?: any }} args
 */
export const del = (args) => {
  const { endpoint, params, ...rest } = args;
  let _endpoint = endpoint;
  if (params && !(params.constructor === Object && !Object.keys(params).length)) {
    _endpoint += `?${qs.stringify(params, { encode: true })}`;
  }
  return request({ method: "DELETE", endpoint: _endpoint, ...rest });
}
