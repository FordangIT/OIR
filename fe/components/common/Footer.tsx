import Link from "next/link";

function Footer() {
  return (
    <footer className="text-center text-sm py-4 text-gray-500 border-t mt-4">
      <div className="flex justify-center gap-3 flex-wrap">
        <Link href="/about" className="hover:underline">
          소개
        </Link>
        <span>|</span>
        <Link href="/privacy" className="hover:underline">
          개인정보처리방침
        </Link>
        <span>|</span>
        <Link href="/contact" className="hover:underline">
          문의
        </Link>
      </div>
    </footer>
  );
}

export default Footer;
