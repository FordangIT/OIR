import { ReactNode } from "react";
import Image from "next/image";
import Nav from "./Nav";
import { useRouter } from "next/router";

interface LayoutProps {
  children: ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  const router = useRouter();
  const hideForPaths = ["/login", "/signup"];

  const shouldHideLogoAndNav = hideForPaths.includes(router.pathname);

  return (
    <div className="h-screen w-full col-position ">
      {!shouldHideLogoAndNav && (
        <header className="fixed top-0 left-0 w-full h-[9vh] row-position bg-white z-10">
          <Image
            src="/images/text_logo3.jpeg"
            alt="OIR 메인 로고"
            width={100}
            height={44}
          />
        </header>
      )}
      <main className="overflow-y-auto w-full mt-[10vh] mb-[8vh]">
        <div className="w-full sm:w-[30rem] bg-white ">{children}</div>
      </main>
      <nav className="fixed bottom-0 left-0 w-full h-[8vh] bg-white row-position z-10">
        {!shouldHideLogoAndNav && <Nav />}
      </nav>
    </div>
  );
}
