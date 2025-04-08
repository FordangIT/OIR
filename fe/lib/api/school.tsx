export const getSchoolMeals = async () => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/school/meal`,
    {
      method: "GET",
      credentials: "include" // 쿠키 자동 포함 (jwtToken)
    }
  );

  if (!response.ok) {
    throw new Error("급식 데이터를 가져오는데 실패했습니다.");
  }
  const data = await response.json(); // ✅ 한 번만 호출!
  return data;
};
