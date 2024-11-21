import { FormData } from "@/components/login/LoginForm";

export async function login({ userid, password }: FormData) {
  try {
    // 요청 URL과 데이터 로그 출력
    console.log(
      "Request URL:",
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/login`
    );
    console.log("Request body:", { userId: userid, password: password });

    // API 요청
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/login`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ userId: userid, password: password }),
        credentials: "include" // 쿠키 전송을 위한 설정
      }
    );
    // 응답 상태 확인
    console.log("Response status:", res.status);
    console.log("Response headers:", res.headers);

    if (!res.ok) {
      const errorData = await res.json();
      throw new Error(errorData.message || `HTTP error! status: ${res.status}`);
    }

    // JSON 파싱
    const result = await res.json();

    // API 응답 데이터 확인
    console.log("Response data:", result);

    if (!result.success) {
      throw new Error(result.message || "Login failed");
    }

    return result; // 성공 시 결과 반환
  } catch (error) {
    if (error instanceof Error) {
      console.error("Login error:", error.message);
    } else {
      console.error("Login error:", error);
    }
    throw error; // Re-throw the error
  }
}
