import React from "react";
import { useQuery } from "react-query";
import { getTimetable } from "@/lib/api/timetable";

interface TimetableEntry {
  day: string;
  period: number;
  subject: string;
  teacher: string;
  color: string;
}

const Table: React.FC = () => {
  const days: string[] = ["월", "화", "수", "목", "금"];
  const periods: string[] = Array.from({ length: 9 }, (_, i) => `${i}`);

  const {
    data: timetable,
    isLoading,
    isError
  } = useQuery<TimetableEntry[]>("timetable", getTimetable, {
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
              <th className="border border-gray-300 bg-gray-100"></th>
              {days.map((day) => (
                <th key={day} className="border border-gray-300 bg-gray-100">
                  {day}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {periods.map((period) => (
              <tr key={period}>
                <td className="border border-gray-30 bg-gray-50">{period}</td>
                {days.map((day) => {
                  const entry = timetable?.find(
                    (t) => t.day === day && t.period === parseInt(period)
                  );
                  return (
                    <td
                      key={`${day}-${period}`}
                      className="border border-gray-300"
                      style={{
                        width: "100px",
                        height: "60px",
                        pointerEvents: "none",
                        userSelect: "none",
                        cursor: "default"
                      }}
                    >
                      {entry && (
                        <div>
                          <div>{entry.subject}</div>
                          <div className="text-sm text-gray-500">
                            {entry.teacher}
                          </div>
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

export default Table;
