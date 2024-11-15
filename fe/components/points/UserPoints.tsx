import { useQuery } from "react-query";
import { getUserPoints } from "@/lib/api/points";

export default function UserPoints() {
  const { data, error, isLoading } = useQuery("userPoints", getUserPoints);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error instanceof Error) {
    return <div>Error: {error.message}</div>;
  }

  return <div>{data?.data} 포인트</div>;
}
