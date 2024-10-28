import Link from "next/link";
import Icon from "@/components/common/Icon";
import TextInfo from "./TextInfo";
export default function Nav() {
  return (
    <div className="w-full flex justify-around items-center">
      <Link href="/send">
        <div className="main-icon-wrapper group">
          <Icon name="send" className="icon-base" />
          <TextInfo text="send" />
        </div>
      </Link>
      <Link href="/inbox">
        <div className="main-icon-wrapper group">
          <Icon name="message" className="icon-base" />
          <TextInfo text="message" />
        </div>
      </Link>
      <Link href="/points">
        <div className="main-icon-wrapper group">
          <Icon name="money" className="icon-base" />
          <TextInfo text="points" />
        </div>
      </Link>
    </div>
  );
}
