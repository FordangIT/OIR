import { ReactNode } from "react";
import Image from "next/image";
interface LayoutProps {
  children: ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  return (
    <div className="w-full col-position">
      <div className="w-full h-16 border-b-2 row-position">
        <Image
          src="/images/text_logo3.jpeg"
          alt="OIR 메인 로고"
          width={100}
          height={44}
        />
      </div>
      <div className="row-position min-h-screen w-full sm:w-[30rem] bg-white">
        {children}
      </div>
    </div>
  );
}
