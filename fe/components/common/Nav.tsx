import Link from "next/link";
import Icon from "@/components/common/Icon";
import TextInfo from "./TextInfo";
import { useSelector } from "react-redux";
import { RootState } from "@/lib/redux/store";
export default function Nav() {
  const userId = useSelector((state: RootState) => state.auth.userId);
  return (
    <div className="w-full flex justify-around items-center">
      <Link href="/">
        <div className="main-icon-wrapper group">
          <Icon name="home" className="icon-base" />
        </div>
      </Link>
      <Link href="/timetable">
        <div className="main-icon-wrapper group">
          <Icon name="timetable" className="icon-base" />
        </div>
      </Link>
      <Link href="/send">
        <div className="main-icon-wrapper group">
          <Icon name="send" className="icon-base" />
        </div>
      </Link>
      <Link href={`/inbox/${userId}`}>
        <div className="main-icon-wrapper group">
          <Icon name="message" className="icon-base" />
        </div>
      </Link>
      <Link href="/points">
        <div className="main-icon-wrapper group">
          <Icon name="money" className="icon-base" />
        </div>
      </Link>
    </div>
  );
}
