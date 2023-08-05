import { Provider } from "react-redux";
import Layout from "../components/layout/Layout";
import store from "../redux/store/store";
import "../styles/globals.css";
import "../styles/styles.css";
// import "react-toastify/dist/ReactToastify.css";

function MyApp({ Component, pageProps }) {
  if (Component.getLayout) {
    return (
      <Provider store={store}>
        {Component.getLayout(<Component {...pageProps} />)}
      </Provider>
    );
  }
  return (
    <Provider store={store}>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </Provider>
  );
}

export default MyApp;
