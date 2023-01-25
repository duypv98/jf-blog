import { JsonWebTokenError, TokenExpiredError } from "jsonwebtoken";
import { verifyCredentials } from "../backend/utils/jwtHelper";
import { UnauthorizedErrorData } from "./config";

export class APIHandler {
  /**
   * @param {Record<"get" | "post" | "patch" | "del", import("next").NextApiHandler>} args
   */
  constructor(args) {
    this.get = args.get;
    this.post = args.post;
    this.patch = args.patch;
    this.del = args.del;
  }
}

/**
 *
 * @param {APIHandler} args
 * @returns {import("next").NextApiHandler}
 */
export const createHandler = (args) => (req, res) => {
  if (req.method === "GET" && args.get) {
    return args.get(req, res);
  }
  if (req.method === "POST" && args.post) {
    return args.post(req, res);
  }
  if (req.method === "PATCH" && args.patch) {
    return args.patch(req, res);
  }
  if (req.method === "DELETE" && args.del) {
    return args.del(req, res);
  }
  return res.status(405).json({ message: "Method is not allowed" });
}

/**
 *
 * @param {Error | string} err
 * @param {import("next").NextApiResponse} res
 */
export const errorHandler = (err, res) => {
  if (typeof err === "string") {
    return res.status(400).json({ message: err });
  }
  if (err instanceof JsonWebTokenError) {
    const errRsp = { message: "Unauthorized", data: null };
    if (err instanceof TokenExpiredError) {
      errRsp.data = UnauthorizedErrorData.TOKEN_EXPIRED;
    }
    return res.status(401).json(errRsp);
  }
  return res.status(500).message({ message: err.message });
}

/**
 *
 * @param {import("next").NextApiRequest} req
 * @param {import("next").NextApiResponse} res
 */
export const jwtMiddleware = async (req, res) => {
  const authorizationHeader = req.headers.authorization;
  if (!authorizationHeader) {
    res.status(401).json({});
    return false;
  }
  const [authType, token] = authorizationHeader.split(" ");
  if (authType.toLowerCase() !== "bearer" || !token) {
    res.status(401).json({});
    return false;
  }
  const credentials = verifyCredentials({ token, type: "accessToken" });
  if (!credentials) {
    res.status(401).json({});
    return false;
  }
  if (credentials?.tokenExpired) {
    res.status(401).json({ data: UnauthorizedErrorData.TOKEN_EXPIRED });
    return false;
  }
  req.credentials = credentials;
  return true;
}
