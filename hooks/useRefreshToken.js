import useCMSAuth from "./useCMSAuth";
import { apiRefreshToken } from "../app/apis/auth.api";

const useRefreshToken = () => {
  const { setAuth } = useCMSAuth();

  const refresh = async () => {
    const refreshData = await apiRefreshToken();
    setAuth((prev) => ({ ...prev, accessToken: refreshData.accessToken }));
    return refreshData.accessToken;
  }
  return refresh;
}

export default useRefreshToken;