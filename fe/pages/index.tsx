import Image from "next/image";
import Icon from "@/components/common/Icon";
export default function Home() {
  return (
    <div className="w-full flex justify-center items-center">
      <div className="w-full h-32 flex justify-evenly items-center bg-tossback-gray">
        <Icon
          name="send"
          className="w-12 h-12 p-1 text-main-green bg-white rounded-md"
        />
        <Icon
          name="message"
          className="w-12 h-12 p-1 text-main-orange bg-white rounded-md"
        />
        <Image
          src="/images/main.jpeg"
          alt="충전소"
          width={45}
          height={55}
          className="rounded-md"
        />
        <Icon
          name="money"
          className="w-12 h-12 p-1 text-yellow-400 bg-white rounded-md"
        />
      </div>
    </div>
  );
}
