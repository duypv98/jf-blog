import authService from "../../backend/services/auth";
import { APIHandler, createHandler } from "../../utils/APIHandler";

export default createHandler(new APIHandler({
  post: async (req, res) => {
    const refreshToken = req.body.refreshToken;
    if (!refreshToken) {
      return res.status(401).json({});
    }
    const refreshTokenData = await authService.refreshToken(refreshToken);
    if (!refreshTokenData) {
      return res.status(401).json({});
    }
    return res.json(refreshTokenData);
  }
}));