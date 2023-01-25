import { UserModel } from "../models/user";
import { compareHashPassword, hashPassword } from "../utils/encryption";
import { signCredentials, verifyCredentials } from "../utils/jwtHelper";
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
  },

  getMe: async (args) => {
    const userId = args.userId;
    const user = await UserModel.findById(userId).select("-password");
    return user;
  },

  /**
   *
   * @param {string} _refreshToken
   */
  refreshToken: async (_refreshToken) => {
    const credentials = verifyCredentials({ token: _refreshToken, type: "refreshToken" });
    if (!credentials) return null;
    const newCredentials = { userId: credentials.userId };
    const accessToken = signCredentials({ type: "accessToken", credentials: newCredentials });
    const newRefreshToken = signCredentials({ type: "refreshToken", credentials: newCredentials });
    return {
      accessToken,
      refreshToken: newRefreshToken
    }
  }
}