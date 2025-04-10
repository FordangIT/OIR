// components/TimetableSlide.tsx
import React, { useState } from "react";
import { X, Trash2, Save } from "lucide-react";
import ColorPicker from "@/lib/utils/ColorPicker";

interface TimetableSlideProps {
  day: string;
  period: number;
  subject: string;
  teacher: string;
  color: string;
  details: string;
  onClose: () => void;
  onDelete: () => void;
  onSave: (data: {
    subject: string;
    teacher: string;
    color: string;
    details: string;
  }) => void;
}

const TimetableSlide: React.FC<TimetableSlideProps> = ({
  day,
  period,
  subject: initialSubject,
  teacher: initialTeacher,
  color: initialColor,
  details: initialDetails,
  onClose,
  onDelete,
  onSave
}) => {
  const [subject, setSubject] = useState(initialSubject);
  const [teacher, setTeacher] = useState(initialTeacher);
  const [color, setColor] = useState(initialColor);
  const [details, setDetails] = useState(initialDetails);

  return (
    <div className="w-full p-4">
      <div className="flex justify-between items-center mb-2 ">
        <h2 className="text-lg font-semibold">
          {day}요일 {period}교시
        </h2>
        <button onClick={onClose} className="btn btn-ghost btn-sm">
          <X className="w-4 h-4" />
        </button>
      </div>

      <div className="grid gap-3 ">
        <input
          className="input input-bordered"
          value={subject}
          onChange={(e) => setSubject(e.target.value)}
          placeholder="과목"
        />
        <input
          className="input input-bordered "
          value={teacher}
          onChange={(e) => setTeacher(e.target.value)}
          placeholder="선생님"
        />
        <div className="overflow-x-auto max-w-full min-h-10">
          <ColorPicker color={color} onChange={setColor} />
        </div>

        <textarea
          className="textarea textarea-bordered "
          value={details}
          onChange={(e) => setDetails(e.target.value)}
          placeholder="메모"
        />
      </div>

      <div className="flex justify-between mt-4">
        <button
          className="btn btn-error bg-main-red border-none text-white"
          onClick={onDelete}
        >
          <Trash2 className="w-4 h-4 mr-1" />
          삭제
        </button>
        <button
          className="btn btn-primary bg-main-green border-none text-white"
          onClick={() => onSave({ subject, teacher, color, details })}
        >
          <Save className="w-4 h-4 mr-1" />
          저장
        </button>
      </div>
    </div>
  );
};

export default TimetableSlide;
