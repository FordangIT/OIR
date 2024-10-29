import "@/styles/globals.css";
import type { AppProps } from "next/app";
import Layout from "@/components/common/Layout";
import { store } from "@/lib/redux/store";
import { Provider } from "react-redux";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <Provider store={store}>
      <div className="flex justify-center items-center">
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </div>
    </Provider>
  );
}
