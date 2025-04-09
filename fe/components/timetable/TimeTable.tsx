import React, { useState } from "react";
import { useQuery, useQueryClient } from "react-query";
import {
  getMyTimetable,
  addTimetable,
  deleteTimetable
} from "@/lib/api/timetable";
import TimetableSlide from "./TimetableSlide";
import { COLOR_CLASS_MAP } from "@/lib/utils/ColorClassMap";

interface TimetableEntry {
  day: string;
  period: number;
  subject: string;
  teacher: string;
  color: string;
  details: string;
}

const TimeTable: React.FC = () => {
  const days = ["월", "화", "수", "목", "금"];
  const periods = Array.from({ length: 8 }, (_, i) => `${i + 1}`);

  const [selectedCell, setSelectedCell] = useState<TimetableEntry | null>(null);
  const queryClient = useQueryClient();

  const {
    data: timetable,
    isLoading,
    isError
  } = useQuery<TimetableEntry[]>(["myTimetable"], getMyTimetable, {
    staleTime: 60000
  });

  const handleCellClick = (entry: TimetableEntry) => {
    setSelectedCell(entry);
  };

  const handleClose = () => {
    setSelectedCell(null);
  };

  const handleDelete = async () => {
    if (!selectedCell) return;
    await deleteTimetable({
      day: selectedCell.day,
      period: selectedCell.period
    });
    await queryClient.invalidateQueries("myTimetable");
    handleClose();
  };

  const handleSave = async (data: {
    subject: string;
    teacher: string;
    color: string;
    details: string;
  }) => {
    if (!selectedCell) return;
    await addTimetable({
      ...data,
      day: selectedCell.day,
      period: selectedCell.period
    });
    await queryClient.invalidateQueries("myTimetable");
    handleClose();
  };

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Failed to load timetable</div>;

  return (
    <div className="container mx-auto">
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
                      className="w-[100px] h-[60px] text-xs text-center align-middle overflow-hidden text-ellipsis select-none border border-gray-300 cursor-pointer"
                      onClick={() =>
                        handleCellClick(
                          entry || {
                            day,
                            period: parseInt(period),
                            subject: "",
                            teacher: "",
                            color: "pink",
                            details: ""
                          }
                        )
                      }
                    >
                      {entry && (
                        <div
                          className={`w-full h-full flex items-center justify-center text-center text-xs leading-tight ${
                            COLOR_CLASS_MAP[entry.color] || ""
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

      {/* Drawer 구조 */}
      <div className="drawer drawer-bottom z-50">
        <input
          type="checkbox"
          id="slide-drawer"
          className="drawer-toggle"
          checked={!!selectedCell}
          readOnly
        />
        <div className="drawer-content"></div>
        <div className="drawer-side">
          <label
            htmlFor="slide-drawer"
            className="drawer-overlay"
            onClick={handleClose}
          ></label>
          <div className="menu p-0 w-full bg-base-100 rounded-t-xl mt-auto">
            {selectedCell && (
              <TimetableSlide
                {...selectedCell}
                onClose={handleClose}
                onDelete={handleDelete}
                onSave={handleSave}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TimeTable;
