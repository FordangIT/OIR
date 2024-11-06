import { FormData } from "@/components/login/LoginForm";

export async function login({ userid, password }: FormData) {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/login`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ userId: userid, password: password })
      }
    );
    if (!response.ok) {
      throw new Error("failed to fetch data");
    }
    const result = await response.json();
    return result;
  } catch (error) {
    console.error("Error logging in:", error);
    throw new Error("Failed to log in");
  }
}
