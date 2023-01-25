import authService from "../../../backend/services/auth";
import { APIHandler, createHandler, jwtMiddleware } from "../../../utils/APIHandler";

export default createHandler(new APIHandler({
  get: async (req, res) => {
    const isAuthenticated = await jwtMiddleware(req, res);
    if (!isAuthenticated) return res;
    const userId = req.credentials.userId;
    const user = await authService.getMe({ userId });
    return res.json(user);
  }
}));