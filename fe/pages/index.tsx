import Link from "next/link";
export default function Home() {
  return (
    <div className="col-position h-full w-full ">
      <Link href="/login">
        <span className="block text-gray-500 p-2 hover:bg-slate-100 rounded-lg">
          로그인 하러 가기
        </span>
      </Link>
      <Link href="signup">
        <span className="block text-blue-500 p-2  hover:bg-slate-100 rounded-lg">
          회원가입 하러 가기
        </span>
      </Link>
    </div>
  );
}
