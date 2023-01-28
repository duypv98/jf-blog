import postServices from "../../../backend/services/post";
import { APIHandler, createHandler, jwtMiddleware } from "../../../utils/APIHandler";

export default createHandler(new APIHandler({
  get: async (req, res) => {
    const {
      skip: _skip,
      limit: _limit,
      sortBy: _sortBy,
      asc: _asc,
      category: _category
    } = req.query;
    const skip = typeof _skip === "string" && !isNaN(+_skip) ? +_skip : undefined;
    const limit = typeof _limit === "string" && !isNaN(+_limit) ? +_limit : undefined;
    const sortBy = ["createdAt", "title"].includes(_sortBy) ? _sortBy : undefined;
    const asc = ["true", "false"].includes(_asc) ? !!JSON.parse(_asc) : undefined;
    const category = _category === "uncategorized" ? null : (typeof _category === "string" ? _category : undefined);

    const data = await postServices.getList({
      skip, limit, sortBy, asc, category, excludePrivate: true
    });
    return res.json(data);
  },
  post: async (req, res) => {
    const type = req.query.type;
    const isAuthenticated = await jwtMiddleware(req, res);
    if (!isAuthenticated) return res;
    let data = null;
    if (type === "create_one") {
      data = await postServices.createOne({
        ...req.body,
        owner: req.credentials.userId
      });
    }
    return res.json(data);
  }
}));