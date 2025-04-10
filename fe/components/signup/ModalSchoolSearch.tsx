import { useState, useEffect } from "react";
import { useQuery } from "react-query";
import { searchSchool } from "../../lib/api/signup"; // API 호출 함수 재사용
import { SignUpFormData } from "./SignUpForm";

interface School {
  ATPT_OFCDC_SC_CODE: string; // 시도교육청 코드
  SD_SCHUL_CODE: string; // 행정표준코드
  SCHUL_NM: string; // 학교명
  SCHUL_KND: string;
}

interface ModalSchoolSearchProps {
  onClose: () => void;
  onSelectSchool: (school: SignUpFormData["school"]) => void;
}

export default function ModalSchoolSearch({
  onClose,
  onSelectSchool
}: ModalSchoolSearchProps) {
  const [schoolName, setSchoolName] = useState("");
  const [query, setQuery] = useState(""); // 실제 API 호출 시 사용할 검색어
  const [hasSearched, setHasSearched] = useState(false); // 👈 alert 중복 방지용

  const {
    data: schools = [],
    isFetching,
    isSuccess
  } = useQuery(["schools", query], () => searchSchool(query), {
    enabled: !!query,
    onError: (error) => {
      console.error("학교 검색 실패:", error);
    }
  });

  // ✅ 빈 배열일 경우 알림 띄우기
  // 👇 useEffect에서 한 번만 alert
  useEffect(() => {
    if (!isFetching && isSuccess && schools.length === 0 && hasSearched) {
      alert("학교명을 정확히 입력해 주세요. ex) 숭의, 효성 ");
      setHasSearched(false); // 다시 검색해야 alert 뜨도록 리셋
    }
  }, [schools, hasSearched, isFetching, isSuccess]);

  // 검색 버튼 클릭 시 호출되는 함수
  const handleSearch = () => {
    if (!schoolName.trim()) {
      alert("학교명을 입력해주세요."); // 입력값 검증
      return;
    }
    setQuery(schoolName);
    setHasSearched(true); // 검색 후 alert 방지
  };

  const handleSelectSchool = (school: School) => {
    onSelectSchool({
      educationOfficeCode: school.ATPT_OFCDC_SC_CODE,
      schoolCode: school.SD_SCHUL_CODE,
      schoolName: school.SCHUL_NM,
      schoolKind: school.SCHUL_KND
    }); // 선택한 학교 이름을 부모 컴포넌트로 전달
    onClose();
  };

  return (
    <>
      <div className="modal-box bg-white w-full">
        <h3 className="font-bold text-md p-2">학교 검색</h3>

        <input
          type="text"
          placeholder="학교명을 입력하세요 ex) 효성"
          value={schoolName}
          onChange={(e) => setSchoolName(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              e.preventDefault();
              e.stopPropagation();
              handleSearch();
            }
          }}
          className="input input-bordered w-full m-1 text-sm"
        />
        <div className="flex justify-end mt-1">
          <button
            type="button"
            className="btn "
            onClick={handleSearch}
            disabled={isFetching}
          >
            {isFetching ? "검색 중..." : "검색"}
          </button>
        </div>

        <ul>
          {schools.map((school: School) => (
            <li
              key={school.SD_SCHUL_CODE}
              className="p-2 border-b cursor-pointer hover:bg-gray-200"
              onClick={() => handleSelectSchool(school)}
            >
              <strong>{school.SCHUL_NM}</strong> (행정코드:
              {school.SD_SCHUL_CODE})
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}
