import categoryServices from "../../../backend/services/category";
import { APIHandler, createHandler, jwtMiddleware } from "../../../utils/APIHandler";

const handler = createHandler(new APIHandler({
  get: async (req, res) => {
    const data = await categoryServices.getAll();
    return res.json(data);
  },
  post: async (req, res) => {
    const type = req.query.type;
    const isAuthenticated = await jwtMiddleware(req, res);
    if (!isAuthenticated) return res;
    let data = null;
    if (type === "create_one") {
      const { title, slug, tag } = req.body;
      data = await categoryServices.createOne({ title, slug, tag });
    }
    return res.json(data);
  }
}));

export default handler;