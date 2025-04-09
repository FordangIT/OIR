import { useState } from "react";
import Link from "next/link";
import { Menu } from "lucide-react"; // lucide-react 아이콘 라이브러리 추천

export default function Toolbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* 햄버거 아이콘 */}
      <button
        className="p-2 focus:outline-none"
        onClick={() => setIsOpen(true)}
      >
        <Menu className="w-7 h-7" />
      </button>

      {/* 사이드바 */}
      <div
        className={`fixed top-0 right-0 h-full w-64 bg-white shadow-lg z-50 transform transition-transform duration-300 ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex justify-end p-4">
          <button onClick={() => setIsOpen(false)}>✕</button>
        </div>
        <nav className="flex flex-col gap-4 px-6">
          <Link href="/login" onClick={() => setIsOpen(false)}>
            로그인 / 회원가입
          </Link>
          <Link href="/contact" onClick={() => setIsOpen(false)}>
            문의하기
          </Link>
        </nav>
      </div>

      {/* 배경 어두운 오버레이 */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black opacity-50 z-40"
          onClick={() => setIsOpen(false)}
        />
      )}
    </>
  );
}
