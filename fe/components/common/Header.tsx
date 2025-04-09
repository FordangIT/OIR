import Image from "next/image";
import Link from "next/link";
import Toolbar from "./Toolbar";

export default function Header() {
  return (
    <div className="flex items-center justify-between w-full h-20 px-2">
      <div>
        <Link href="/">
          <Image
            src="/images/text_logo3.png"
            alt="OIR oir 메인 로고"
            width={80}
            height={44}
          />
        </Link>
      </div>
      <div>
        <Toolbar />
      </div>
    </div>
  );
}
