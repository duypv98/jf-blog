import { useContext, useEffect } from "react";
import { apiGetMe } from "../app/apis/auth.api";
import CMSAuthContext from "../context/CMSAuthContext";

const useCMSAuth = () => {
  const useAuthContext = useContext(CMSAuthContext);
  useEffect(() => {
    apiGetMe()
      .then((data) => {
        if (data) {
          useAuthContext.setAuth({
            user: { name: data.name },
            loading: false
          })
        } else {
          useAuthContext.setAuth({
            loading: false
          })
        }
      })
      // eslint-disable-next-line no-unused-vars
      .catch((_) => {
        useAuthContext.setAuth({
          loading: false
        })
      });
  }, []);

  return useAuthContext;
}

export default useCMSAuth;