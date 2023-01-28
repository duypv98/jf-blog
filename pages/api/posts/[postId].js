import postServices from "../../../backend/services/post";
import { APIHandler, createHandler, jwtMiddleware } from "../../../utils/APIHandler";

export default createHandler(new APIHandler({
  get: async (req, res) => {
    const isAuthenticated = await jwtMiddleware(req, res);
    if (!isAuthenticated) return res;
    const postId = req.query.postId;
    const data = await postServices.getById(postId);
    return res.json(data);
  },

  patch: async (req, res) => {
    const isAuthenticated = await jwtMiddleware(req, res);
    if (!isAuthenticated) return res;
    const postId = req.query.postId;
    const data = await postServices.updateById({
      _id: postId,
      ...req.body
    });
    return res.json(data);
  },

  del: async (req, res) => {
    const isAuthenticated = await jwtMiddleware(req, res);
    if (!isAuthenticated) return res;
    const postId = req.query.postId;
    const data = await postServices.deleteById(postId);
    return res.json(data);
  }
}))