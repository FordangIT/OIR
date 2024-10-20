import { IconType } from "react-icons";
import { CiUser } from "react-icons/ci";
import { FaSchool } from "react-icons/fa";
import { IoIosSchool } from "react-icons/io";
import { PiFinnTheHumanFill } from "react-icons/pi";
import { RiLockPasswordFill } from "react-icons/ri";
import { FiUsers } from "react-icons/fi";
import { BsSendPlusFill } from "react-icons/bs";
import { TbMessage2Heart } from "react-icons/tb";
import { RiMoneyDollarCircleFill } from "react-icons/ri";

interface IconProps {
  name: string;
  className?: string;
}

const iconsMap: { [key: string]: IconType } = {
  school: FaSchool,
  grade: IoIosSchool,
  username: FiUsers,
  userid: CiUser,
  password: RiLockPasswordFill,
  repassword: RiLockPasswordFill,
  nickname: PiFinnTheHumanFill,
  send: BsSendPlusFill,
  message: TbMessage2Heart,
  money: RiMoneyDollarCircleFill
};

const Icon = ({ name, className }: IconProps) => {
  const IconComponent = iconsMap[name];
  return IconComponent ? <IconComponent className={className} /> : null;
};

export default Icon;
