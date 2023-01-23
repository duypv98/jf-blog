import { useContext } from "react";
import CMSAuthContext from "../context/CMSAuthContext";

const useCMSAuth = () => {
  return useContext(CMSAuthContext);
}

export default useCMSAuth;