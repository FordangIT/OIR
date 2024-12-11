import Table from "@/components/timetable/Table";
import Icon from "@/components/common/Icon";

export default function Timetable() {
  return (
    <div className="">
      <div className="flex justify-between items-center my-5 ">
        <div className="font-semibold text-xl">시간표</div>
        <Icon name="plus" className="text-2xl" />
      </div>
      <div>
        <Table></Table>
      </div>
    </div>
  );
}
