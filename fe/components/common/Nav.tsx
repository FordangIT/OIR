"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import Icon from "@/components/common/Icon";
import { useSelector } from "react-redux";
import { RootState } from "@/lib/redux/store";

const navItems = [
  { href: "/", icon: "home", label: "홈" },
  { href: "/timetable", icon: "timetable", label: "시간표" },
  { href: "/send", icon: "send", label: "보내기" },
  { href: "/inbox", icon: "message", label: "쪽지함" },
  { href: "/points", icon: "money", label: "포인트" }
];

export default function Nav() {
  const userId = useSelector((state: RootState) => state.auth.userId);
  const pathname = usePathname();

  return (
    <div className="w-full flex justify-around items-center py-2">
      {navItems.map((item) => {
        const href = item.href === "/inbox" ? `/inbox/${userId}` : item.href;
        const isActive =
          pathname === item.href || pathname.startsWith(item.href + "/");

        return (
          <Link href={href} key={item.href}>
            <div className="flex flex-col items-center group">
              <Icon
                name={item.icon}
                className={`w-6 h-6 transition-colors ${
                  isActive ? "text-black" : "text-gray-400"
                }`}
              />
              <span
                className={`text-xs mt-1 transition-colors ${
                  isActive ? "text-black font-semibold" : "text-gray-400"
                }`}
              >
                {item.label}
              </span>
            </div>
          </Link>
        );
      })}
    </div>
  );
}
