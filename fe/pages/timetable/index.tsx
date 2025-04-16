"use client";
import { useState, useRef, useEffect } from "react";
import TimeTable from "@/components/timetable/TimeTable";
import GradeClassForm from "@/components/timetable/GradeClassForm";
import FriendListSlide from "@/components/timetable/FriendListSlide";
import Cookies from "js-cookie";

function Timetable() {
  const gradeClassRef = useRef<HTMLDialogElement>(null);
  const [isFriendSidebarOpen, setIsFriendSidebarOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  // 쿠키 기반 로그인 체크

  // 클라이언트에서만 쿠키 확인
  useEffect(() => {
    const token = Cookies.get("jwtToken");
    setIsLoggedIn(!!token);
    console.log("jwtToken:", token);
  }, []);

  const openGradeClassModal = () => {
    if (!isLoggedIn) {
      alert("로그인이 필요합니다");
      return;
    }
    gradeClassRef.current?.showModal();
  };

  const openFriendSidebar = () => {
    if (!isLoggedIn) {
      alert("로그인이 필요합니다");
      return;
    }
    setIsFriendSidebarOpen(true);
  };

  const closeGradeClassModal = () => {
    gradeClassRef.current?.close();
  };

  return (
    <div>
      <div className="flex justify-between items-center my-5">
        <div className="font-semibold text-xl">시간표</div>
        <div className="flex gap-2">
          <button
            className="bg-main-orange rounded-md text-center text-white px-3 py-1 text-sm"
            onClick={openGradeClassModal}
          >
            자동 시간표
          </button>
          <button
            className="rounded-md border-slate-100"
            onClick={openFriendSidebar}
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

      <TimeTable />
      {isLoggedIn && (
        <FriendListSlide
          isLoggedIn={isLoggedIn}
          isOpen={isFriendSidebarOpen}
          onClose={() => setIsFriendSidebarOpen(false)}
        />
      )}
    </div>
  );
}

export default Timetable;
