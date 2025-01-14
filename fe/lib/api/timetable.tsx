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

  if (!res.ok) {
    throw new Error("Failed to fetch timetable");
  }

  return res.json();
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
