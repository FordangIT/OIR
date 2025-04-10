import { useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "react-query";
import { setGradeClassAndUpdateTimetable } from "@/lib/api/timetable";

interface GradeClassFormData {
  grade: number;
  classNm: number;
}

export default function GradeClassForm({ onClose }: { onClose: () => void }) {
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<GradeClassFormData>();

  const queryClient = useQueryClient();
  const { mutate: setGradeClassMutation, isLoading } = useMutation(
    setGradeClassAndUpdateTimetable,
    {
      onSuccess: () => {
        queryClient.invalidateQueries("myTimetable");
        onClose();
      },
      onError: (error: any) => {
        console.error("Failed to add grade/class:", error.message);
      }
    }
  );

  const onSubmit = (data: GradeClassFormData) => {
    const cleanData = {
      grade: Number(String(data.grade).replace(/^0+/, "")),
      classNm: Number(String(data.classNm).replace(/^0+/, ""))
    };
    setGradeClassMutation(cleanData);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div className="w-full p-1 text-center text-main-red text-xs">
        기존 시간표 초기화되고, 이번주 시간표 업데이트 됩니다.
      </div>
      <div>
        <label className="block text-sm font-medium mb-1">학년</label>
        <input
          type="number"
          {...register("grade", {
            required: "학년을 입력하세요.",
            valueAsNumber: true
          })}
          className="input input-bordered w-full"
          min={1}
        />
        {errors.grade && (
          <p className="text-red-500 text-sm mt-1">{errors.grade.message}</p>
        )}
      </div>

      {/* 반 입력 */}
      <div>
        <label className="block text-sm font-medium mb-1">반</label>
        <input
          type="number"
          {...register("classNm", {
            required: "반을 입력하세요.",
            valueAsNumber: true
          })}
          className="input input-bordered w-full"
          min={1}
        />
        {errors.classNm && (
          <p className="text-red-500 text-sm mt-1">{errors.classNm.message}</p>
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
