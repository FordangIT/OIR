import truncate from "@/lib/utils/truncate";
import Link from "next/link";
const data = [
  { messageId: 1, content: "첫번째 메시지" },
  {
    messageId: 2,
    content: "hi2 내가 널 많이 좋아하게 됐어. 이걸 말해도될까? "
  },
  { messageId: 3, content: "hi3" },
  { messageId: 4, content: "hi1" },
  {
    messageId: 5,
    content: "hi2 내가 널 많이 좋아하게 됐어. 이걸 말해도될까? "
  },
  { messageId: 6, content: "hi3" },
  { messageId: 7, content: "hi1" },
  {
    messageId: 8,
    content: "hi2 내가 널 많이 좋아하게 됐어. 이걸 말해도될까? "
  },
  { messageId: 9, content: "hi3" },
  { messageId: 10, content: "hi1" },
  {
    messageId: 11,
    content: "hi2 내가 널 많이 좋아하게 됐어. 이걸 말해도될까? "
  },
  { messageId: 12, content: "hi3" },
  { messageId: 13, content: "hi1" },
  {
    messageId: 14,
    content: "hi2 내가 널 많이 좋아하게 됐어. 이걸 말해도될까? "
  },
  { messageId: 15, content: "hi3" },
  { messageId: 16, content: "hi1" },
  {
    messageId: 17,
    content: "hi2 내가 널 많이 좋아하게 됐어. 이걸 말해도될까? "
  },
  { messageId: 18, content: "hi3" },
  { messageId: 19, content: "hi1" },
  {
    messageId: 20,
    content: "hi2 내가 널 많이 좋아하게 됐어. 이걸 말해도될까? "
  },
  { messageId: 21, content: "hi3" },
  { messageId: 22, content: "hi1" },
  {
    messageId: 23,
    content: "마지막 메시지"
  }
];
export default function InboxList() {
  return (
    <div className="w-full min-h-screen grid grid-cols-1 divide-y-2 border-2">
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
