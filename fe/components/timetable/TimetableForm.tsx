import { useForm, Controller } from "react-hook-form";
import { useMutation, useQueryClient } from "react-query";
import { addTimetable } from "@/lib/api/timetable";

interface TimetableFormData {
  day: string;
  period: number;
  subject: string;
  teacher: string;
  color: string;
  details: string;
}

export default function TimetableForm({ onClose }: { onClose: () => void }) {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors }
  } = useForm<TimetableFormData>();

  const queryClient = useQueryClient();
  const { mutate: addTimetableMutation, isLoading } = useMutation(
    addTimetable,
    {
      onSuccess: () => {
        queryClient.invalidateQueries("timetable");
        onClose();
      },
      onError: (error: any) => {
        console.error("Failed to add timetable:", error.message);
      }
    }
  );

  const onSubmit = (data: TimetableFormData) => {
    console.log(data, "submit에서 data");
    addTimetableMutation(data); // 시간표 추가 API 호출
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      {/* 요일 및 교시 선택 */}
      <div>
        <label className="block text-sm font-medium mb-1">요일</label>
        <select
          {...register("day", { required: "요일을 선택하세요." })}
          className="select select-bordered w-full"
        >
          <option value="">요일 선택</option>
          <option value="월">월요일</option>
          <option value="화">화요일</option>
          <option value="수">수요일</option>
          <option value="목">목요일</option>
          <option value="금">금요일</option>
        </select>
        {errors.day && (
          <p className="text-red-500 text-sm mt-1">
            {String(errors.day.message)}
          </p>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">교시</label>
        <input
          type="number"
          {...register("period", {
            required: "교시를 입력하세요.",
            valueAsNumber: true
          })}
          className="input input-bordered w-full"
          min={1}
        />
        {errors.period && (
          <p className="text-red-500 text-sm mt-1">
            {String(errors.period.message)}
          </p>
        )}
      </div>

      {/* 과목 작성 */}
      <div>
        <label className="block text-sm font-medium mb-1">과목</label>
        <input
          type="text"
          {...register("subject", { required: "과목을 입력하세요." })}
          className="input input-bordered w-full"
        />
        {errors.subject && (
          <p className="text-red-500 text-sm mt-1">
            {String(errors.subject.message)}
          </p>
        )}
      </div>

      {/* 선생님 이름 작성 */}
      <div>
        <label className="block text-sm font-medium mb-1">선생님 이름</label>
        <input
          type="text"
          {...register("teacher", { required: "선생님 이름을 입력하세요." })}
          className="input input-bordered w-full"
        />
        {errors.teacher && (
          <p className="text-red-500 text-sm mt-1">
            {String(errors.teacher.message)}
          </p>
        )}
      </div>

      {/* 색깔 선택 */}
      <div>
        <label className="block text-sm font-medium mb-1">색깔</label>
        <Controller
          name="color"
          control={control}
          rules={{ required: "색깔을 선택하세요." }}
          render={({ field }) => (
            <input
              type="color"
              {...field}
              className="w-16 h-8 border border-gray-300 rounded-md"
            />
          )}
        />
        {errors.color && (
          <p className="text-red-500 text-sm mt-1">
            {String(errors.color.message)}
          </p>
        )}
      </div>

      {/* 제출 버튼 */}
      <div className="flex justify-end">
        <button type="submit" className="btn" disabled={isLoading}>
          {isLoading ? "저장 중..." : "저장"}
        </button>
      </div>
    </form>
  );
}
