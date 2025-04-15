import { useRouter } from "next/router";
import { useQuery } from "react-query";
import { getUserMessage } from "@/lib/api/inbox";
import formatDate from "@/lib/utils/formatDate";
import { useIsOwner } from "@/lib/hooks/useIsOwner";
import ReplyBox from "./ReplyBox";
import { useState } from "react";
import Image from "next/image";

interface Reply {
  senderId: string;
  content: string;
  sentAt: string;
}

interface Message {
  _id: string;
  content: string;
  sentAt: string;
  replies?: Reply[];
}

export default function InboxList() {
  const router = useRouter();
  const { userId } = router.query;
  const isOwner = useIsOwner();
  const [replyBoxOpen, setReplyBoxOpen] = useState<{ [key: string]: boolean }>(
    {}
  );

  const toggleReplyBox = (id: string) => {
    setReplyBoxOpen((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const { data, error, isLoading, isError } = useQuery(
    ["userMessages", userId],
    () => getUserMessage(userId as string),
    {
      enabled: typeof userId === "string"
    }
  );

  const handleCopy = () => {
    const url = `${window.location.origin}/send/${userId}`;
    navigator.clipboard
      .writeText(url)
      .then(() => alert("주소가 복사되었습니다."))
      .catch(() => alert("복사에 실패했습니다."));
  };

  if (isLoading) return <div>Loading...</div>;

  if (isError || !data?.success) {
    return (
      <div>
        {error instanceof Error
          ? error.message
          : "메시지를 가져오는 중 오류가 발생했습니다."}
      </div>
    );
  }

  const messages: Message[] = data.data;

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold">{`받은 편지함 (${messages.length})`}</h2>
        <button
          onClick={handleCopy}
          className="text-sm px-3 py-1 border border-gray-400 rounded-md hover:bg-gray-100"
        >
          주소 복사
        </button>
      </div>

      <div className="space-y-3">
        {messages.length === 0 ? (
          <div className="flex flex-col items-center justify-center min-h-[300px]">
            <div className="text-center text-gray-500 text-sm  ">
              아직 받은 쪽지가 없어요, <br />
              주소를 복사해서 친구에게 공유해보세요!
            </div>
            <Image
              src={`/images/post.png`}
              alt="post"
              height={80}
              width={80}
              className="py-6"
            />
          </div>
        ) : (
          messages.map((el) => (
            <div
              key={el._id}
              className="bg-white p-4 rounded-lg shadow-sm border space-y-2"
            >
              <div className="text-sm whitespace-pre-wrap break-words">
                {el.content}
              </div>
              <div className="text-xs text-gray-500 text-right">
                {formatDate(el.sentAt)}
              </div>

              {/* 답변 목록 */}
              {Array.isArray(el.replies) && el.replies.length > 0 && (
                <div className="mt-2 border-t pt-2 space-y-1">
                  <div className="text-xs font-medium text-gray-600">
                    💬 답변
                  </div>
                  {el.replies?.map((reply, index) => (
                    <div
                      key={index}
                      className="pl-3 border-l border-gray-300 ml-1 text-sm text-gray-800"
                    >
                      <p className="whitespace-pre-wrap break-words">
                        {reply.content}
                      </p>
                      <p className="text-[11px] text-right text-gray-500 mt-1">
                        {formatDate(reply.sentAt)}
                      </p>
                    </div>
                  ))}
                </div>
              )}

              {isOwner && (
                <div className="mt-2">
                  <button
                    onClick={() => toggleReplyBox(el._id)}
                    className="text-xs text-blue-600 underline"
                  >
                    {replyBoxOpen[el._id] ? "답장 닫기" : "답장하기"}
                  </button>
                  {replyBoxOpen[el._id] && (
                    <ReplyBox
                      parentMessageId={el._id}
                      onClose={() => toggleReplyBox(el._id)}
                    />
                  )}
                </div>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
}
