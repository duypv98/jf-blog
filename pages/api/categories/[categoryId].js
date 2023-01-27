import categoryServices from "../../../backend/services/category";
import { APIHandler, createHandler, jwtMiddleware } from "../../../utils/APIHandler";

export default createHandler(new APIHandler({
  patch: async (req, res) => {
    const isAuthenticated = await jwtMiddleware(req, res);
    if (!isAuthenticated) return res;
    const categoryId = req.query.categoryId;
    const { title, slug, tag } = req.body;
    const data = await categoryServices.updateById({
      _id: categoryId,
      title, slug, tag
    });
    return res.json(data);
  }
}));