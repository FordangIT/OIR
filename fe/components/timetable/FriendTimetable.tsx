// components/timetable/FriendTimetableSlide.tsx
import React, { useState } from "react";
import { useQuery } from "react-query";
import { getFriendTimetable } from "@/lib/api/friends";
import { COLOR_CLASS_MAP } from "@/lib/utils/ColorClassMap";

interface FriendTimetableProps {
  isOpen: boolean;
  onClose: () => void;
  friendName: string;
}

interface TimetableEntry {
  day: string;
  period: number;
  subject: string;
  teacher?: string;
  color?: string;
  details?: string;
}

const days = ["월", "화", "수", "목", "금"];
const periods = Array.from({ length: 8 }, (_, i) => `${i + 1}`);

export default function FriendTimetable({
  isOpen,
  onClose,
  friendName
}: FriendTimetableProps) {
  const {
    data: timetable,
    isLoading,
    isError
  } = useQuery<TimetableEntry[]>(
    ["friendTimetable", friendName],
    () => getFriendTimetable(friendName),
    {
      enabled: isOpen
    }
  );

  return (
    <div
      className={`fixed top-0 right-0 w-full h-full bg-white z-50 shadow-lg transition-transform duration-300 ease-in-out ${
        isOpen ? "translate-x-0" : "translate-x-full"
      }`}
    >
      <div className="flex justify-between items-center p-4 border-b">
        <h2 className="text-lg font-semibold">{friendName}의 시간표</h2>
        <button
          onClick={onClose}
          className="text-gray-500 text-xl font-bold hover:text-gray-800"
        >
          ×
        </button>
      </div>

      <div className="p-4 overflow-y-auto h-[calc(100%-56px)]">
        {isLoading ? (
          <div>Loading...</div>
        ) : isError ? (
          <div>시간표를 불러오지 못했습니다.</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="table-auto border-collapse border border-gray-300 w-full text-center">
              <thead>
                <tr>
                  <th className="border border-gray-300 bg-gray-100"></th>
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
                    <td className="border border-gray-300 bg-gray-50 px-2 py-1 text-xs">
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
                            <div
                              className={`w-full h-full flex items-center justify-center text-center text-xs leading-tight ${
                                COLOR_CLASS_MAP[entry.color || ""] || ""
                              }`}
                            >
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
        )}
      </div>
    </div>
  );
}
