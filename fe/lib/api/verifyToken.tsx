export const verifyToken = async () => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/verify`,
    {
      method: "GET",
      credentials: "include" // 쿠키를 전송하기 위해 설정
    }
  );
  if (!response.ok) {
    const errorResponse = await response.json();
    throw new Error(errorResponse.reason || "Verification failed");
  }
  return response.json();
};
