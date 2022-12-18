import { APIHandler, createHandler } from "../../utils/APIHandler";

const handler = createHandler(new APIHandler({
  get: async (req, res) => {
    return res.json({ message: "OK" });
  }
}));

export default handler;