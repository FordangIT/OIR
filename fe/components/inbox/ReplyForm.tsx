// components/inbox/ReplyForm.tsx
import { useState } from "react";
import { useMutation } from "react-query";
import { sendMessage } from "@/lib/api/send";
import { useRouter } from "next/router";

interface ReplyFormProps {
  recipientId: string;
  parentMessageId: string;
  onClose: () => void;
}

export default function ReplyForm({
  recipientId,
  parentMessageId,
  onClose
}: ReplyFormProps) {
  const [content, setContent] = useState("");
  const router = useRouter();

  const { mutate } = useMutation(
    () =>
      sendMessage({
        recipientId,
        content,
        parentMessageId
      }),
    {
      onSuccess: () => {
        alert("답변이 전송되었습니다.");
        setContent("");
        onClose();
      },
      onError: () => {
        alert("답변 전송 실패! 포인트 부족 또는 오류입니다.");
        router.push("/points");
      }
    }
  );

  return (
    <div className="mt-3">
      <textarea
        placeholder="답장을 입력하세요..."
        className="w-full h-24 border p-2 rounded-md"
        value={content}
        onChange={(e) => setContent(e.target.value)}
      />
      <button
        className="mt-2 bg-black text-white px-3 py-1 rounded-md"
        onClick={() => mutate()}
      >
        전송
      </button>
    </div>
  );
}
