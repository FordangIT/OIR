import PointClicker from "@/components/points/PointClicker";
import UserPoints from "@/components/points/UserPoints";
import { requireAuthentication } from "@/lib/utils/requireAuthentication";
import { GetServerSideProps } from "next";

export const getServerSideProps: GetServerSideProps = async (context) => {
  return requireAuthentication(context);
};
export default function Points() {
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
}
