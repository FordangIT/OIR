import Image from "next/image";
import Link from "next/link";
import Toolbar from "./Toolbar";

export default function Header() {
  return (
    <div className="flex items-center w-full h-20">
      <div className="flex-grow flex justify-center">
        <Link href="/">
          <Image
            src="/images/text_logo3.png"
            alt="OIR oir 메인 로고"
            width={100}
            height={44}
          />
        </Link>
      </div>
      <div className="absolute right-4">
        <Toolbar />
      </div>
    </div>
  );
}
