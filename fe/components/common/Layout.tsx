import { ReactNode } from "react";
import Nav from "./Nav";
import { useRouter } from "next/router";
import Header from "./Header";
import Footer from "./Footer";

interface LayoutProps {
  children: ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  const router = useRouter();
  const hideForPaths = ["/login", "/signup"];

  const shouldHideLogoAndNav = hideForPaths.includes(router.pathname);

  return (
    <div className="flex flex-col h-screen w-full max-w-full sm:max-w-[440px] lg:max-w-[700px] mx-auto px-4">
      {!shouldHideLogoAndNav && <Header />}
      <main className="row-position flex-1 w-full  h-screen overflow-y-auto">
        <div className="w-full h-full">{children}</div>
      </main>
      <nav className="w-full h-16 bg-white row-position z-10">
        {!shouldHideLogoAndNav && <Nav />}
      </nav>
      <Footer />
    </div>
  );
}
