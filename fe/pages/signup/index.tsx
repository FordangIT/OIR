import SignUpForm from "@/components/signup/SignUpForm";
import Image from "next/image";
export default function SignUp() {
  return (
    <div className="flex flex-col items-center justify-center bg-white h-full w-full">
      <Image
        src="/images/text_logo.png"
        alt="oir 로고"
        width={300}
        height={200}
        className="my-5"
      />
      <SignUpForm />
    </div>
  );
}
