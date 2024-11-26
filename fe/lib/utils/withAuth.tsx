// utils 폴더에 HOC (Higher Order Component) 사용
import { useEffect, ComponentType } from "react";
import { useRouter } from "next/router";
import Cookies from "js-cookie";
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
    const token = Cookies.get("jwtToken"); // 쿠키에서 JWT 토큰 가져오기

    const { isLoading } = useQuery("verifyToken", verifyToken, {
      enabled: !!token,
      retry: false,
      onError: () => {
        router.replace("/login");
        console.log("에러가 난 것임. ");
      },
      onSuccess: (data) => {
        if (!data.valid) {
          router.replace("/login");
          console.log("유효하지 않은 토큰임");
        }
        console.log("성공적임!");
      }
    });

    useEffect(() => {
      if (!token) {
        // JWT 토큰이 없으면 로그인 페이지로 리다이렉트
        router.replace("/login");
        console.log("jwt 토큰이 없음.");
      }
    }, [token, router]);

    if (isLoading) {
      return <div>Loading...</div>;
    }

    return <WrappedComponent {...props} />;
  };

  return AuthWrapper;
};

export default withAuth;
