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