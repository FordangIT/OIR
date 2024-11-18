import "@/styles/globals.css";
import Head from "next/head";
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
    <>
      <Head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta name="author" content="onschoolisreal" />
        <meta
          name="keywords"
          content="oir, OIR, 오아이알, 익명 메시지, onschool"
        />
        <meta
          name="description"
          content="익명으로 메시지를 보내는 새로운 방법! 오아이알에서 진심을 전하세요."
        />
        <meta property="og:locale" content="ko_KR" />
        <meta property="og:site_name" content="onschool is real" />
        <meta property="og:title" content="onschool is real" />
        <meta
          property="og:description"
          content="온라인 학교에서 익명 메시지를 보내세요. 진심을 전할 수 있는 공간, 오아이알!"
        />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://onschoolisreal.site" />
        <meta
          property="og:image"
          content="https://onschoolisreal.site/images/main_logo.png"
        />
        <meta name="twitter:card" content="오아이알 익명 메시지" />
        <meta name="twitter:title" content="onschool is real" />
        <meta
          name="twitter:description"
          content="온라인 학교에서 익명 메시지를 보내세요. 진심을 전할 수 있는 공간, 오아이알!"
        />
        <meta
          name="twitter:image"
          content="https://onschoolisreal.site/images/main_logo.png"
        />
        <link rel="icon" href="/images/main.png" />
        <link rel="canonical" href="https://onschoolisreal.site" />
      </Head>
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
    </>
  );
}
