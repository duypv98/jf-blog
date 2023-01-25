import { createContext, useState } from "react";

/**
 * @typedef {{
 *  user: {
 *    name: string;
 *  };
 *  loading: boolean;
 * }} AuthState
 */

/**
 * @type {import("react").Context<{
 *  auth: AuthState;
 *  setAuth: import("react").Dispatch<import("react").SetStateAction<AuthState>>
 * }>}
 */
const CMSAuthContext = createContext({});

/**
 *
 * @param {import("react").PropsWithChildren<{}>} param0
 */
export const CMSAuthProvider = ({ children }) => {
  /**
   * @type {[AuthState, import("react").Dispatch<import("react").SetStateAction<AuthState>]}
   */
  const [auth, setAuth] = useState({ loading: true });

  return <CMSAuthContext.Provider value={{ auth, setAuth }}>
    {children}
  </CMSAuthContext.Provider>
}

export default CMSAuthContext;