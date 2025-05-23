import { useRouter } from "next/router";
import { useDispatch } from "react-redux";
import { useMutation } from "react-query";
import { logout } from "@/lib/api/login";
import { removeUserId } from "@/lib/redux/slices/authSlice";

export default function LogoutButton() {
  const dispatch = useDispatch();
  const router = useRouter();

  const logoutMutation = useMutation(logout, {
    onSuccess: () => {
      dispatch(removeUserId());
      router.push("/login");
    },
    onError: (error) => {
      console.error("Logout failed", error);
      alert("로그아웃에 실패했습니다. 다시 시도해주세요.");
    }
  });

  return (
    <button
      onClick={() => logoutMutation.mutate()}
      className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
    >
      로그아웃
    </button>
  );
}
