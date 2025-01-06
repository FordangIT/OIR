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
      staleTime: 60000, // 60초 동안 데이터 재검증 방지
      cacheTime: 120000, // 2분 동안 캐시 유지
      onSuccess: (data) => {
        if (!data.valid) {
          handleInvalidToken(data.reason);
        }
      },
      onError: () => {
        console.error("Error during token verification:", error);
        alert("인증 과정에서 문제가 발생했습니다.");
        router.replace("/send");
      }
    });

    const handleInvalidToken = (reason: string) => {
      switch (reason) {
        case "user_not_found":
          alert("유효하지 않은 사용자입니다.");
          break;
        case "jwt_token_not_found":
          alert("로그인이 필요합니다.");
          break;
        case "token_expired":
          alert("토큰이 만료되었습니다. 다시 로그인 해주세요.");
          break;
        default:
          alert("알 수 없는 오류가 발생했습니다.");
      }
      router.replace("/send");
    };

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
