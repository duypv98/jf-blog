import { APIHandler, createHandler } from "../../utils/APIHandler";

const handler = createHandler(new APIHandler({
  get: (req, res) => {
    return res.json({ message: "OK" });
  }
}));

export default handler;