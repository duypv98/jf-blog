import dynamic from "next/dynamic";
import { SSRProvider } from "react-bootstrap";
import { Provider } from "react-redux";
import { store } from "../app/store";
import { CMSAuthProvider } from "../context/CMSAuthContext";
import '../styles/_global.scss';

const ToastifyConfig = dynamic(() => import("../components/ToastifyConfig"), { ssr: false });

function MyApp({ Component, pageProps }) {
  return <SSRProvider>
    <CMSAuthProvider>
      <Provider store={store}>
        <Component {...pageProps} />
        <ToastifyConfig />
      </Provider>
    </CMSAuthProvider>
  </SSRProvider>
}

export default MyApp
