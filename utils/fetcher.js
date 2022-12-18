import fetch from "isomorphic-fetch";
import qs from "query-string";

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
 * @typedef {{
 * endpoint: string;
 * method: "GET" | "POST" | "PATCH" | "DELETE";
 * body?: any;
 * customHeaders?: Record<string, string>;
 * bodyType?: "json" | "multipart",
 * responseType?: "json" | "buffer" | "text";
 * withCredentials?: boolean;
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
  } = args;
  let _endpoint = endpoint;
  if (!endpoint.startsWith("http")) {
    _endpoint = `${apiHost}${endpoint}`;
  }
  const headers = {
    ...defaultHeaders,
    ...customHeaders
  };
  if (method === "POST" && bodyType === "multipart") headers["Content-Type"] = "multipart/form-data";
  try {
    const response = await fetch(_endpoint, {
      method,
      headers,
      body: body ? (bodyType === "multipart" ? body : JSON.stringify(body)) : null,
      credentials: withCredentials ? "include" : "omit"
    });
    const data = responseType === "buffer"
      ? await response.arrayBuffer()
      : (responseType === "text" ? await response.text() : await response.json());
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