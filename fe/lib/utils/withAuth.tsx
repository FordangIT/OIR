// utils 폴더에 HOC(Higher Order Component) 사용
import { ComponentType } from "react";
import { useRouter } from "next/router";
import { verifyToken } from "../api/verifyToken";
import { useQuery } from "react-query";

interface WithAuthProps {
  [key: string]: unknown;
}

const withAuth = <P extends WithAuthProps>(
  WrappedComponent: ComponentType<P>
) => {
  const AuthWrapper = (props: P) => {
    const router = useRouter();

    const { data, error, isLoading } = useQuery("verifyToken", verifyToken, {
      retry: false,
      onSuccess: (data) => {
        if (!data.valid) {
          if (data.reason === "user_not_found") {
            alert("유효하지 않은 사용자입니다.");
          } else if (data.reason === "jwt_token_not_found") {
            alert("로그인이 필요합니다.");
          } else if (data.reason === "token_expired") {
            alert("토큰이 만료되었습니다. 다시 로그인 해주세요.");
          } else {
            alert("알 수 없는 오류가 발생했습니다.");
          }
          router.replace("/send");
        }
      },
      onError: () => {
        console.error("Error during token verification:", error);
        alert("인증 과정에서 문제가 발생했습니다.");
        router.replace("/send");
      }
    });

    if (isLoading) {
      return <div>Loading...</div>;
    }
    if (data?.valid) {
      return <WrappedComponent {...props} />;
    }

    return null;
  };

  return AuthWrapper;
};

export default withAuth;
