import { useRef } from "react";
import Table from "@/components/timetable/Table";
import Icon from "@/components/common/Icon";
import TimetableForm from "@/components/timetable/TimetableForm";
export default function Timetable() {
  const modalRef = useRef<HTMLDialogElement>(null);
  const openModal = () => {
    modalRef.current?.showModal();
  };
  const closeModal = () => {
    modalRef.current?.close();
  };
  return (
    <div className="">
      <div className="flex justify-between items-center my-5 ">
        <div className="font-semibold text-xl">시간표</div>
        <Icon
          name="plus"
          className="text-2xl cursor-pointer"
          onClick={openModal}
        />
        <dialog ref={modalRef} className="modal">
          <div className="modal-box">
            <TimetableForm onClose={closeModal} />
          </div>
        </dialog>
      </div>
      <div>
        <Table></Table>
      </div>
    </div>
  );
}
