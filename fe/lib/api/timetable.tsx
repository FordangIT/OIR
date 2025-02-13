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
  classNumber: number;
}

export async function addGradeClass(data: GradeClassData): Promise<any> {
  const queryParams = new URLSearchParams({
    grade: data.grade.toString(),
    classNm: data.classNumber.toString()
  });

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/timetable?${queryParams}`,
    {
      method: "GET",
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

export async function getTimetable() {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/timetable/get`,
    {
      method: "GET",
      credentials: "include"
    }
  );
  if (!res.ok) {
    console.error("Failed to fetch timetable", res.status, await res.text());
    throw new Error("Failed to fetch timetable");
  }
  const data = await res.json();
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
