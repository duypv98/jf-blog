import dynamic from "next/dynamic";
import { Provider } from "react-redux";
import { store } from "../app/store";
import { CMSAuthProvider } from "../context/CMSAuthContext";
import '../styles/_global.scss';

const ToastifyConfig = dynamic(() => import("../components/ToastifyConfig"), { ssr: false });

function MyApp({ Component, pageProps }) {
  return typeof window !== "undefined"
    ? <CMSAuthProvider>
      <Provider store={store}>
        <Component {...pageProps} />
        <ToastifyConfig />
      </Provider>
    </CMSAuthProvider>
    : <Component {...pageProps} />
}

export default MyApp
