import truncate from "@/lib/utils/truncate";
import { getUserMessage } from "@/lib/api/inbox";
import { useQuery } from "react-query";
import { useRouter } from "next/router";
import formatData from "@/lib/utils/formatDate";
interface Message {
  messageId: string;
  content: string;
  sentAt: string;
}

export default function InboxList() {
  const router = useRouter();
  const { userId } = router.query;

  const { data, error, isLoading, isError } = useQuery(
    ["userMessages"],
    () => getUserMessage(userId as string),
    {
      enabled: typeof userId === "string" // userId가 있을 때만 쿼리 활성화
    }
  );

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError || !data?.success) {
    return (
      <div>
        {error instanceof Error
          ? error.message
          : "메시지를 가져오는 중 오류가 발생했습니다. "}
      </div>
    );
  }

  const messages: Message[] = data.data;
  return (
    <>
      <div className="text-black z-10 py-2">{`받은 편지함 (${messages.length})`}</div>
      <div className=" w-full h-full overflow-y-auto ">
        {messages.map((el) => (
          <div
            key={el.messageId}
            className="w-full h-fit flex justify-between items-center text-justify hover:shadow-xl py-3 bg-tossback-gray mb-1"
          >
            <div>{truncate(el.content)}</div>
            <div>{formatData(el.sentAt)}</div>
          </div>
        ))}
      </div>
    </>
  );
}
