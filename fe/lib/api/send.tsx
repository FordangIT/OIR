export interface MessageForm {
  recipientId: string;
  content: string;
}

export async function sendMessage({ recipientId, content }: MessageForm) {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/message/send`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ recipientId, content }),
      credentials: "include"
    }
  );

  const result = await res.json();
  if (!result.success) {
    throw new Error(`${result.message}`);
  }
  return result;
}
