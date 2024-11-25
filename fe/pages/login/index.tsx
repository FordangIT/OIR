import Image from "next/image";
import LoginForm from "@/components/login/LoginForm";

export default function Login() {
  return (
    <div className="flex flex-col items-center justify-center bg-white w-full h-full">
      <Image
        src="/images/main_logo.png"
        alt="oir 메인 로고"
        width={300}
        height={200}
        layout="responsive"
        priority={true}
      />
      <LoginForm />
    </div>
  );
}
