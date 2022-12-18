import { APIHandler, createHandler } from "../../utils/APIHandler";
import dbConnect from "../../utils/mongodb";

const handler = createHandler(new APIHandler({
  get: async (req, res) => {
    await dbConnect();
    return res.json({ message: "OK" });
  }
}));

export default handler;