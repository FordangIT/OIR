import { FormData } from "@/components/login/LoginForm";

export async function login({ userid, password }: FormData) {
  try {
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

    if (!res.ok) {
      const errorData = await res.json();
      throw new Error(errorData.message || `HTTP error! status: ${res.status}`);
    }

    // JSON 파싱
    const result = await res.json();

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
