import React, { useRef } from "react";
import { useForm } from "react-hook-form";
import { useQuery } from "react-query";
import { searchSchool } from "../../lib/api/signup"; // API 호출 함수 재사용

interface School {
  ATPT_OFCDC_SC_CODE: string;
  SD_SCHUL_CODE: string;
  SCHUL_NM: string;
}

interface ModalSchoolSearchProps {
  onClose: () => void;
  onSelectSchool: (schoolName: string) => void;
}

export default function ModalSchoolSearch({
  onClose,
  onSelectSchool
}: ModalSchoolSearchProps) {
  const modalRef = useRef<HTMLDialogElement>(null);
  const { register, handleSubmit, watch } = useForm<{ schoolName: string }>();
  const schoolName = watch("schoolName");

  const {
    data: schools = [],
    error,
    isFetching,
    refetch
  } = useQuery(["schools", schoolName], () => searchSchool(schoolName), {
    enabled: false
  });

  const searchSchools = () => refetch();

  const handleSelectSchool = (school: School) => {
    onSelectSchool(school.SCHUL_NM);
    modalRef.current?.close();
  };

  return (
    <dialog ref={modalRef} className="modal">
      <div className="modal-box w-11/12 max-w-5xl">
        <h3 className="font-bold text-lg">학교 검색</h3>
        <form
          onSubmit={handleSubmit(searchSchools)}
          className="my-4 flex items-center gap-4"
        >
          <input
            type="text"
            placeholder="학교명을 입력하세요"
            {...register("schoolName", { required: true })}
            className="input input-bordered w-full"
          />
          <button type="submit" className="btn" disabled={isFetching}>
            {isFetching ? "검색 중..." : "검색"}
          </button>
        </form>
        {error && <p className="text-red-500">{String(error)}</p>}
        <ul>
          {schools.map((school) => (
            <li
              key={school.SD_SCHUL_CODE}
              className="p-2 border-b cursor-pointer hover:bg-gray-200"
              onClick={() => handleSelectSchool(school)}
            >
              <strong>{school.SCHUL_NM}</strong> (행정코드:{" "}
              {school.SD_SCHUL_CODE})
            </li>
          ))}
        </ul>
        <div className="modal-action">
          <button className="btn" onClick={onClose}>
            닫기
          </button>
        </div>
      </div>
    </dialog>
  );
}
