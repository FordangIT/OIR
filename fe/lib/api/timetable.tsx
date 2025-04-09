import axios from "axios";

interface TimetableData {
  day: string;
  period: number;
  subject: string;
  teacher: string;
  color: string;
  details: string;
}

interface DeleteTimetableData {
  day: string;
  period: number;
}

export interface GradeClassData {
  grade: number;
  classNm: number;
}

//사용자 학년/반 설정
export async function setGradeClassAndUpdateTimetable(
  data: GradeClassData
): Promise<any> {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/timetable/grade-class`,
    {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        grade: data.grade,
        classNm: data.classNm
      }),
      credentials: "include"
    }
  );
  if (!res.ok) {
    console.error("Failed to fetch timetable", res.status, await res.text());
    throw new Error("Failed to fetch timetable");
  }
  const result = await res.json();
  return result;
}

//사용자의 시간표 조회
export const getMyTimetable = async () => {
  const res = await axios.get(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/timetable/my`,
    {
      withCredentials: true
    }
  );
  return res.data;
};

//시간표 직접 수정(추가)
export async function addTimetable(timetableData: TimetableData) {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/timetable/add`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(timetableData),
      credentials: "include" // Include cookies in the request
    }
  );

  const result = await res.json();
  if (!result.success) {
    throw new Error("Failed to add timetable");
  }
  return result;
}

export async function deleteTimetable(deleteData: DeleteTimetableData) {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/timetable/delete`,
    {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(deleteData),
      credentials: "include" // Include cookies in the request
    }
  );

  const result = await res.json();
  if (!result.success) {
    throw new Error("Failed to delete timetable");
  }

  return result;
}
