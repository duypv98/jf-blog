import { UserModel } from "../models/user";
import { compareHashPassword, hashPassword } from "../utils/encryption";
import { signCredentials } from "../utils/jwtHelper";
import dbConnect from "../utils/mongodb";

export default {
  login: async (args) => {
    await dbConnect();
    const { account, password } = args;
    const user = await UserModel.findOne({ account });
    if (!user) return null;
    const isValidPassword = compareHashPassword(password, user.password);
    if (!isValidPassword) return null;

    const credentials = { userId: user.id };
    const accessToken = signCredentials({ credentials, type: 'accessToken' });
    const refreshToken = signCredentials({ credentials, type: 'refreshToken' });
    return {
      name: user.name,
      accessToken,
      refreshToken
    }
  },

  register: async (args) => {
    const { account, password, name } = args;
    const exUser = await UserModel.findOne({ account });
    if (exUser) return null;
    const hashPwd = await hashPassword(password);

    const user = await UserModel.create({ account, password: hashPwd, name })

    return { userId: user._id };
  }
}