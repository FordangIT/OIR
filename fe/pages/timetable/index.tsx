import { useState, useRef } from "react";
import TimeTable from "@/components/timetable/TimeTable";
import GradeClassForm from "@/components/timetable/GradeClassForm";
import withAuth from "@/lib/utils/withAuth";
import FriendListSlide from "@/components/timetable/FriendListSlide";
function Timetable() {
  const gradeClassRef = useRef<HTMLDialogElement>(null);
  const [isFriendSidebarOpen, setIsFriendSidebarOpen] = useState(false);

  const openGradeClassModal = () => {
    gradeClassRef.current?.showModal();
  };

  const closeGradeClassModal = () => {
    gradeClassRef.current?.close();
  };

  return (
    <div className="">
      <div className="flex justify-between items-center my-5 ">
        <div className="font-semibold text-xl">시간표</div>
        <div className="flex gap-2">
          <button
            className="bg-main-orange rounded-md text-center text-white px-3 py-1 text-sm
        "
            onClick={openGradeClassModal}
          >
            자동 시간표
          </button>
          <button
            className="rounded-md border-slate-100"
            onClick={() => setIsFriendSidebarOpen(true)}
          >
            👥
          </button>
        </div>

        <dialog ref={gradeClassRef} className="modal">
          <div className="modal-box">
            <GradeClassForm onClose={closeGradeClassModal} />
          </div>
        </dialog>
      </div>

      <TimeTable></TimeTable>
      <FriendListSlide
        isOpen={isFriendSidebarOpen}
        onClose={() => setIsFriendSidebarOpen(false)}
      />
    </div>
  );
}

export default withAuth(Timetable);
