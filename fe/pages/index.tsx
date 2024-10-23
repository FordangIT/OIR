import Link from "next/link";
import Icon from "@/components/common/Icon";
import TextInfo from "@/components/common/TextInfo";
export default function Home() {
  return (
    <div className="w-full">
      <div className="w-full h-32 flex justify-evenly items-center bg-tossback-gray">
        <Link href="/send">
          <div className="main-icon-wrapper group">
            <Icon name="send" className="icon-base text-main-green" />
            <TextInfo text="send" />
          </div>
        </Link>
        <Link href="/inbox">
          <div className="main-icon-wrapper group">
            <Icon name="message" className="icon-base text-main-orange " />

            <TextInfo text="message" />
          </div>
        </Link>

        <Link href="/points">
          <div className="main-icon-wrapper group">
            <Icon name="money" className="icon-base text-yellow-400 " />
            <TextInfo text="points" />
          </div>
        </Link>
      </div>
    </div>
  );
}
