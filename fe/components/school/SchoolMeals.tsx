import Image from "next/image";
import { getSchoolMeals } from "@/lib/api/school";
import { useQuery } from "react-query";

interface Meal {
  date: string;
  mealType: string;
  menu: Array<string>;
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

  if (data.results.length === 0) {
    return (
      <div className="flex flex-col justify-center items-center">
        <Image
          src="/images/main.png"
          alt="이번달 급식 정보 없음~"
          width={130}
          height={100}
        />
        <div className="py-2">
          이번달 <span className="text-main-green">급식 정보</span>가 없습니다
        </div>
      </div>
    );
  }
  const schoolName = data.results[0].school;
  const meals: Meal[] = data.results;

  return (
    <div className="flex flex-col justify-center h-full">
      <div className="flex flex-col justify-center items-center py-4">
        <div className="text-2xl font-bold mb-4">🏫 {schoolName} </div>
        <div className="text-black z-10 py-2">{`📌 이번 달 급식`}</div>
      </div>

      <div className="flex-1 overflow-y-auto px-4 ">
        {meals.map((meal, index) => (
          <div
            key={index}
            className="w-full h-fit py-3 bg-gray-100 mb-2 p-3 rounded-md"
          >
            <div className="w-full flex justify-between mb-1">
              <div className="font-bold">
                {`${meal.date.slice(4, 6)}/${meal.date.slice(6)}`}
              </div>
              <div className="border rounded-2xl px-2 text-center text-white bg-main-orange font-semibold">
                {meal.mealType}
              </div>
            </div>
            <div className="flex-row">
              {meal.menu.map((el, idx) => (
                <div key={idx} className="text-center py-1">
                  {el}
                </div>
              ))}
            </div>
            <div className="text-sm text-gray-500 mt-2">🔥 {meal.calories}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
