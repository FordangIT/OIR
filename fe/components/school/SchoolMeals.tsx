import { getSchoolMeals } from "@/lib/api/school";
import { useQuery } from "react-query";

interface Meal {
  date: string;
  mealType: string;
  menu: string;
  calories: string;
}

export default function SchoolMeals() {
  const { data, error, isLoading, isError } = useQuery(
    ["schoolMeals"],
    getSchoolMeals
  );

  if (isLoading) {
    return <div>급식 데이터를 불러오는 중...</div>;
  }

  if (isError || !data?.results) {
    return (
      <div>
        {error instanceof Error
          ? error.message
          : "급식 데이터를 가져오는 중 오류가 발생했습니다."}
      </div>
    );
  }

  const meals: Meal[] = data.results;

  return (
    <>
      <div className="text-black z-10 py-2">{`📌 이번 달 급식 (${meals.length})`}</div>
      <div className="w-full h-full overflow-y-auto">
        {meals.map((meal, index) => (
          <div
            key={index}
            className="w-full h-fit flex flex-col justify-between items-start text-justify hover:shadow-xl py-3 bg-gray-100 mb-1 p-3 rounded-md"
          >
            <div className="font-bold">
              {meal.date} ({meal.mealType})
            </div>
            <div>🍽 {meal.menu}</div>
            <div className="text-sm text-gray-500">🔥 {meal.calories}</div>
          </div>
        ))}
      </div>
    </>
  );
}
