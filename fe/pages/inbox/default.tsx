// app/inbox/default.tsx (또는 pages/inbox/default.tsx)
"use client";

import Image from "next/image";
import Link from "next/link";

export default function DefaultInboxPage() {
  return (
    <div className="space-y-3 px-4 py-8">
      <div className="flex flex-col items-center justify-center min-h-[300px]">
        <Link href="/login">
          <div className="text-center text-main-green underline text-sm">
            로그인하고 쪽지함을 확인해보세요
          </div>
        </Link>
        <Image
          src="/images/post.png"
          alt="post"
          height={80}
          width={80}
          className="py-6"
        />
      </div>
    </div>
  );
}
