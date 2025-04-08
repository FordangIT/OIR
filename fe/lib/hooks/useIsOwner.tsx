import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { verifyToken } from "@/lib/api/verifyToken"; // 아까 작성한 verifyToken 함수

export function useIsOwner() {
  const router = useRouter();
  const { userId } = router.query;
  const [isOwner, setIsOwner] = useState<boolean | null>(null); // null: 로딩중

  useEffect(() => {
    const checkOwner = async () => {
      try {
        const res = await verifyToken(); // { valid: true, user: { userId: '...' } }
        if (res.valid && res.user?.userId === userId) {
          setIsOwner(true);
        } else {
          setIsOwner(false);
        }
      } catch (err) {
        console.error("토큰 확인 실패:", err);
        setIsOwner(false);
      }
    };

    if (userId) checkOwner();
  }, [userId]);

  return isOwner;
}
