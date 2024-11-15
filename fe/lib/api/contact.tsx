interface FormData {
  content: string;
}

export async function contact(content: FormData) {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/contact`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ content: content }),
    credentials: "include"
  });
  const result = await res.json();
  if (!result.success) {
    throw new Error("failed to contact");
  }
}
