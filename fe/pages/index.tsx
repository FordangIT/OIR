import Table from "@/components/timetable/Table";
import Icon from "@/components/common/Icon";
import Modal from "@/components/timetable/Modal";
export default function Timetable() {
  return (
    <div className="">
      <div className="flex justify-between items-center my-5 ">
        <div className="font-semibold text-xl">시간표</div>

        <Modal />
      </div>
      <div>
        <Table></Table>
      </div>
    </div>
  );
}
