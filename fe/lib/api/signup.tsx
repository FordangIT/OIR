import { SignUpFormData } from "@/components/signup/SignUpForm";

export async function signup({
  school,
  userId,
  password,
  nickname
}: SignUpFormData) {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/register`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          school,
          userId,
          password,
          nickname,
          inbox: [],
          points: 0,
          timetable: []
        })
      }
    );
    if (!res.ok) {
      const errorResult = await res.json();
      return errorResult;
    }
    const result = await res.json();
    return result;
  } catch (error) {
    console.error("Error Sign up ", error);
    throw new Error("Failed to Sign up");
  }
}

export async function checkUserId(userId: string) {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/check-userid?userId=${userId}`,
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
    throw new Error("failed to check id");
  }
}

export async function checkNickname(nickname: string) {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/check-nickname?nickname=${nickname}`,
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
    console.error("Error checking nickname", error);
    throw new Error("failed to check nickname");
  }
}

export async function searchSchool(schoolName: string) {
  try {
    const res = await fetch(
      `${
        process.env.NEXT_PUBLIC_BACKEND_URL
      }/school/search?schoolName=${encodeURIComponent(schoolName)}`,
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
    return result.results || [];
  } catch (error) {
    console.error("Error searching school", error);
    throw new Error("Failed to search school");
  }
}
