import { FormData } from "@/components/login/LoginForm";

export async function login({ userid, password }: FormData) {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ userId: userid, password: password })
  });
  const result = await res.json();
  if (!result.success) {
    throw new Error(`${result.message}`);
  }
  return result;
}
