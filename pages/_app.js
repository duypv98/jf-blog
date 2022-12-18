import { Provider } from "react-redux";
import { store } from "../app/store";
import '../styles/_global.scss';

function MyApp({ Component, pageProps }) {
  return typeof window !== "undefined"
    ? <Provider store={store}>
      <Component {...pageProps} />
    </Provider>
    : <Component {...pageProps} />
}

export default MyApp
