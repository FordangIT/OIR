export const verifyToken = async () => {
  try {
    console.log("verifytoken 함수 실행");
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/verify`,
      {
        method: "GET",
        credentials: "include" // 쿠키를 전송하기 위해 설정
      }
    );

    if (!response.ok) {
      throw new Error("JWT verification failed");
    }

    return await response.json();
  } catch (error) {
    throw error;
  }
};
