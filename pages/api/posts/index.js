import postServices from "../../../backend/services/post";
import { APIHandler, createHandler, jwtMiddleware } from "../../../utils/APIHandler";

export default createHandler(new APIHandler({
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