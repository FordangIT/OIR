import { useState } from "react";
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
  const [schoolName, setSchoolName] = useState("");
  const [query, setQuery] = useState(""); // 실제 API 호출 시 사용할 검색어

  const {
    data: schools = [],
    error,
    isFetching
  } = useQuery(["schools", schoolName], () => searchSchool(schoolName), {
    enabled: !!query
  });

  // 검색 버튼 클릭 시 호출되는 함수
  const handleSearch = () => {
    if (!schoolName.trim()) {
      alert("학교명을 입력해주세요."); // 입력값 검증
      return;
    }
    setQuery(schoolName);
  };

  const handleSelectSchool = (school: School) => {
    onSelectSchool(school.SCHUL_NM); // 선택한 학교 이름을 부모 컴포넌트로 전달
    onClose();
  };

  return (
    <>
      <div className="modal-box w-11/12 max-w-5xl">
        <h3 className="font-bold text-lg">학교 검색</h3>

        <input
          type="text"
          placeholder="학교명을 입력하세요"
          value={schoolName}
          onChange={(e) => setSchoolName(e.target.value)}
          className="input input-bordered w-full"
        />
        <button
          type="button"
          className="btn"
          onClick={handleSearch}
          disabled={isFetching}
        >
          {isFetching ? "검색 중..." : "검색"}
        </button>

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
      </div>
    </>
  );
}
