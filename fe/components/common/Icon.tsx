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
import { RiHome2Line } from "react-icons/ri";
import { FaRegCircleUser } from "react-icons/fa6";
import { FiTable } from "react-icons/fi";
import { CiSquarePlus } from "react-icons/ci";
interface IconProps {
  name: string;
  className?: string;
  onClick?: () => void;
}

const iconsMap: { [key: string]: IconType } = {
  home: RiHome2Line,
  user: FaRegCircleUser,
  timetable: FiTable,
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
  contact: AiOutlineQuestion,
  plus: CiSquarePlus
};

const Icon = ({ name, className, onClick }: IconProps) => {
  const IconComponent = iconsMap[name];
  return IconComponent ? (
    <IconComponent className={className} onClick={onClick} />
  ) : null;
};

export default Icon;
