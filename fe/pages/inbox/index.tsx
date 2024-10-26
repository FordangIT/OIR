import truncate from "@/lib/utils/truncate";
import Link from "next/link";
const data = [
  { messageId: 1, content: "hi1" },
  {
    messageId: 2,
    content: "hi2 내가 널 많이 좋아하게 됐어. 이걸 말해도될까? "
  },
  { messageId: 3, content: "hi3" }
];
export default function Inbox() {
  return (
    <div className="w-full grid grid-cols-1 divide-y-2 border-2">
      {data.map((el) => (
        <Link href={`/inbox/${el.messageId}`} key={el.messageId}>
          <div className="w-full h-10 flex justify-start items-center text-justify hover:shadow-xl">
            <div>{truncate(el.content)}</div>
          </div>
        </Link>
      ))}
    </div>
  );
}
