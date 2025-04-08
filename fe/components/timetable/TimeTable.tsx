import React from "react";
import { useQuery } from "react-query";
import { getMyTimetable } from "@/lib/api/timetable";

interface TimetableEntry {
  day: string;
  period: number;
  subject: string;
  teacher: string;
  color: string;
  details: string;
}

const TimeTable: React.FC = () => {
  const days: string[] = ["월", "화", "수", "목", "금"];
  const periods: string[] = Array.from({ length: 8 }, (_, i) => `${i + 1}`);

  const {
    data: timetable,
    isLoading,
    isError
  } = useQuery<TimetableEntry[]>(["myTimetable"], getMyTimetable, {
    staleTime: 60000
  });

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Failed to load timetable</div>;
  }

  return (
    <div className="container mx-auto ">
      <div className="overflow-x-auto">
        <table className="table-auto border-collaps border border-gray-300 w-full text-center">
          <thead>
            <tr>
              <th className="border border-gray-300 bg-gray-100 "></th>
              {days.map((day) => (
                <th
                  key={day}
                  className="border border-gray-300 bg-gray-100 px-2 py-1 text-xs"
                >
                  {day}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {periods.map((period) => (
              <tr key={period}>
                <td className="border border-gray-30 bg-gray-50 px-2 py-1 text-xs">
                  {period}
                </td>
                {days.map((day) => {
                  const entry = timetable?.find(
                    (t) => t.day === day && t.period === parseInt(period)
                  );
                  return (
                    <td
                      key={`${day}-${period}`}
                      className="w-[100px] h-[60px] text-xs text-center align-middle overflow-hidden text-ellipsis select-none border border-gray-300"
                    >
                      {entry && (
                        <div className="break-words max-w-[30px] mx-auto text-center text-xs leading-tight">
                          <div className="text-xs">{entry.subject}</div>
                        </div>
                      )}
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TimeTable;
