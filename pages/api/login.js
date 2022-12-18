import { APIHandler, createHandler } from "../../utils/APIHandler";
import authServices from "../../backend/services/auth";

export default createHandler(new APIHandler({
  post: async (req, res) => {
    const { account, password } = req.body;
    // const { account, password, name } = req.body;
    const data = await authServices.login({ account, password });
    // const data = await authServices.register({ account, password, name });
    return res.json(data);
  }
}));