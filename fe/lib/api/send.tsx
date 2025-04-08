export interface MessageForm {
  recipientId: string;
  content: string;
  parentMessageId?: string; //답변인 경우만
}

export async function sendMessage(data: MessageForm) {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/message/send`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      credentials: "include",
      body: JSON.stringify(data)
    }
  );

  const result = await res.json();
  if (!result.success) {
    throw new Error(`${result.message}`);
  }
  return result;
}

// replyMessage.ts
export const replyMessage = async (payload: {
  parentMessageId: string;
  content: string;
}) => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/message/reply`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      credentials: "include", // JWT 쿠키 전송
      body: JSON.stringify(payload)
    }
  );

  if (!res.ok) {
    const errorRes = await res.json();
    throw new Error(errorRes.message || "답변 전송 실패");
  }

  return res.json();
};
