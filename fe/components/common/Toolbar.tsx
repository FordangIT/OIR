import Link from "next/link";
import Icon from "@/components/common/Icon";
import TextInfo from "./TextInfo";

export default function Toolbar() {
  return (
    <div className="w-fit h-fit flex">
      <Link href="/login">
        <div className="main-icon-wrapper group mx-1">
          <Icon name="user" className="icon-light" />
          <TextInfo text="로그인" />
        </div>
      </Link>
      <Link href="/contact">
        <div className="main-icon-wrapper group mx-1">
          <Icon name="contact" className="icon-light" />
          <TextInfo text="문의" />
        </div>
      </Link>
    </div>
  );
}
