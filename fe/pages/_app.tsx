import "@/styles/globals.css";
import type { AppProps } from "next/app";
import Layout from "@/components/common/Layout";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <div className="flex justify-center items-center">
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </div>
  );
}
