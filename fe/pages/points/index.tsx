import PointClicker from "@/components/points/PointClicker";
import UserPoints from "@/components/points/UserPoints";

const Points = () => {
  return (
    <div className="flex flex-col h-full">
      <div className="flex justify-end items-center p-5 h-8">
        <UserPoints />
      </div>
      <div className="flex-1 flex justify-center items-center">
        <PointClicker />
      </div>
    </div>
  );
};

export default Points;
