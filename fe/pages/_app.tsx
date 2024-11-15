import "@/styles/globals.css";
import type { AppProps } from "next/app";
import Layout from "@/components/common/Layout";
import store, { persistor } from "@/lib/redux/store";
import { Provider } from "react-redux";
import { QueryClient, QueryClientProvider } from "react-query";
import { useMemo } from "react";
import { PersistGate } from "redux-persist/integration/react";
export default function App({ Component, pageProps }: AppProps) {
  const queryClient = useMemo(() => new QueryClient(), []);

  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <QueryClientProvider client={queryClient}>
          <div className="flex justify-center items-center">
            <Layout>
              <Component {...pageProps} />
            </Layout>
          </div>
        </QueryClientProvider>
      </PersistGate>
    </Provider>
  );
}
