export async function getUserMessage(userId: string) {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/inbox/${userId}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json"
        }
      }
    );
    if (!res.ok) {
      const errorResult = await res.json();
      return errorResult;
    }

    const result = await res.json();
    return result;
  } catch (error) {
    console.error(error);
    throw new Error("failed to get message");
  }
}

export async function deleteMessage(messageId: string) {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/${messageId}`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json"
        },
        credentials: "include"
      }
    );
    if (!res.ok) {
      const errorResult = await res.json();
      return errorResult;
    }

    const result = await res.json();
    return result;
  } catch (error) {
    console.error(error);
    throw new Error("failed to delete message");
  }
}
