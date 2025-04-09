import { useRef } from "react";
import TimeTable from "@/components/timetable/TimeTable";
import Icon from "@/components/common/Icon";
import TimetableForm from "@/components/timetable/TimetableForm";
import GradeClassForm from "@/components/timetable/GradeClassForm";
import withAuth from "@/lib/utils/withAuth";
function Timetable() {
  // const modalRef = useRef<HTMLDialogElement>(null);
  const gradeClassRef = useRef<HTMLDialogElement>(null);
  // const openModal = () => {
  //   modalRef.current?.showModal();
  // };
  // const closeModal = () => {
  //   modalRef.current?.close();
  // };

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
        <button
          className="bg-main-orange rounded-2xl text-center text-white px-3 py-1 text-sm
        "
          onClick={openGradeClassModal}
        >
          학년/반
        </button>
        <dialog ref={gradeClassRef} className="modal">
          <div className="modal-box">
            <GradeClassForm onClose={closeGradeClassModal} />
          </div>
        </dialog>
        {/* <Icon
          name="plus"
          className="text-2xl cursor-pointer"
          onClick={openModal}
        /> */}
        {/* <dialog ref={modalRef} className="modal">
          <div className="modal-box">
            <TimetableForm onClose={closeModal} />
          </div>
        </dialog> */}
      </div>
      <div>
        <TimeTable></TimeTable>
      </div>
    </div>
  );
}

export default withAuth(Timetable);
