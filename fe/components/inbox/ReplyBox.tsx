import { useState } from "react";
import { useMutation, useQueryClient } from "react-query";
import { replyMessage } from "@/lib/api/send"; // 직접 작성한 API 함수

interface ReplyBoxProps {
  parentMessageId: string;
  onClose: () => void;
}

export default function ReplyBox({ parentMessageId, onClose }: ReplyBoxProps) {
  const [reply, setReply] = useState("");
  const queryClient = useQueryClient();

  const { mutate, isLoading } = useMutation(
    (content: string) =>
      replyMessage({
        parentMessageId,
        content
      }),
    {
      onSuccess: () => {
        setReply("");
        onClose();
        queryClient.invalidateQueries("userMessages");
      },
      onError: () => {}
    }
  );

  const handleSend = () => {
    if (reply.trim() === "") {
      return;
    }
    mutate(reply);
  };

  return (
    <div className="space-y-2 mt-2">
      <textarea
        className="w-full h-24 border rounded-md p-2 resize-none text-sm"
        value={reply}
        onChange={(e) => setReply(e.target.value)}
        placeholder="답변을 입력하세요..."
        disabled={isLoading}
      />
      <div className="text-right">
        <button
          onClick={handleSend}
          className="bg-main-orange text-white px-4 py-1 rounded-md text-sm disabled:opacity-50"
          disabled={isLoading}
        >
          {isLoading ? "전송 중..." : "전송"}
        </button>
      </div>
    </div>
  );
}
