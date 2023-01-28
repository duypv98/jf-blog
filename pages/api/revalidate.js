import { APIHandler, createHandler, jwtMiddleware } from "../../utils/APIHandler";

export default createHandler(new APIHandler({
  get: async (req, res) => {
    try {
      const isAuthenticated = await jwtMiddleware(req, res);
      if (!isAuthenticated) return res;
      const path = req.query.path;
      await res.revalidate(path);
      return res.json({ revalidated: true });
    } catch (error) {
      return res.status(500).send('Error revalidating');
    }
  }
}))