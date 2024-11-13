import { IconType } from "react-icons";
import { CiUser } from "react-icons/ci";
import { FaSchool } from "react-icons/fa";
import { IoIosSchool } from "react-icons/io";
import { PiFinnTheHumanFill } from "react-icons/pi";
import { RiLockPasswordFill } from "react-icons/ri";
import { FiUsers } from "react-icons/fi";
import { BsSendPlus } from "react-icons/bs";
import { RiMoneyDollarCircleLine } from "react-icons/ri";
import { AiOutlineQuestion } from "react-icons/ai";
import { MdOutlineMessage } from "react-icons/md";
interface IconProps {
  name: string;
  className?: string;
}

const iconsMap: { [key: string]: IconType } = {
  school: FaSchool,
  grade: IoIosSchool,
  username: FiUsers,
  userId: CiUser,
  password: RiLockPasswordFill,
  repassword: RiLockPasswordFill,
  nickname: PiFinnTheHumanFill,
  send: BsSendPlus,
  message: MdOutlineMessage,
  money: RiMoneyDollarCircleLine,
  question: AiOutlineQuestion
};

const Icon = ({ name, className }: IconProps) => {
  const IconComponent = iconsMap[name];
  return IconComponent ? <IconComponent className={className} /> : null;
};

export default Icon;
