import { useQuery } from "react-query";
import { getUserPoints } from "@/lib/api/points";
import Image from "next/image";

export default function UserPoints() {
  const { data, error, isLoading } = useQuery("userPoints", getUserPoints);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error instanceof Error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div className="row-position">
      <Image
        src="/images/point.png"
        alt="oir 포인트 이미지"
        height={20}
        width={20}
      />
      <p className="mx-2">{data?.data} 포인트</p>
    </div>
  );
}
