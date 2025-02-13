import { useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "react-query";
import { addGradeClass } from "@/lib/api/timetable";

interface GradeClassFormData {
  grade: number;
  classNumber: number;
}

export default function GradeClassForm({ onClose }: { onClose: () => void }) {
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<GradeClassFormData>();

  const queryClient = useQueryClient();
  const { mutate: addGradeClassMutation, isLoading } = useMutation(
    addGradeClass,
    {
      onSuccess: () => {
        queryClient.invalidateQueries("gradeClass");
        onClose();
      },
      onError: (error: any) => {
        console.error("Failed to add grade/class:", error.message);
      }
    }
  );

  const onSubmit = (data: GradeClassFormData) => {
    console.log(data, "submitted grade/class data");
    addGradeClassMutation(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      {/* 학년 입력 */}
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
          {...register("classNumber", {
            required: "반을 입력하세요.",
            valueAsNumber: true
          })}
          className="input input-bordered w-full"
          min={1}
        />
        {errors.classNumber && (
          <p className="text-red-500 text-sm mt-1">
            {errors.classNumber.message}
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
