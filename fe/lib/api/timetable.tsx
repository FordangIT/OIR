interface TimetableData {
  day: string;
  period: number;
  subject: string;
  teacher: string;
  color: string;
}

interface DeleteTimetableData {
  day: string;
  period: number;
}

export async function getTimetable() {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/timetable/get`,
    {
      method: "GET",
      credentials: "include"
    }
  );
  console.log("Response status:", res.status); // 응답 상태 코드 확인
  console.log("Response headers:", res.headers); // 응답 헤더 확인
  if (!res.ok) {
    console.error("Failed to fetch timetable", res.status, await res.text());
    throw new Error("Failed to fetch timetable");
  }
  const data = await res.json();
  console.log("Timetable data:", data); // JSON 변환 후 데이터 확인
  return data;
}

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
