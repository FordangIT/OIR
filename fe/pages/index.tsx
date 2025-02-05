import SchoolMeals from "@/components/school/SchoolMeals";

export default function Timetable() {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">🏫 학교 급식 정보</h1>
      <SchoolMeals />
    </div>
  );
}
