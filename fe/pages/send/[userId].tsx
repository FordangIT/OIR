import { useRouter } from "next/router";
import SendForm from "@/components/send/SendForm";

export default function SendWithUserId() {
  const router = useRouter();
  const { userId } = router.query;

  if (typeof userId !== "string") {
    return <div>로딩 중...</div>;
  }

  return (
    <div className="col-position h-full w-full">
      <span className="block text-red-600 mb-5">
        욕설 및 비방 메시지를 절대 금지합니다.
      </span>
      <SendForm prefilledRecipient={userId} />
      <span className="block text-gray-500 mt-5">
        광고 클릭 수익의 5%가 아동 기부에 사용됩니다.
      </span>
    </div>
  );
}
