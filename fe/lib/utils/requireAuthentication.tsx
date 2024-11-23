import {
  GetServerSideProps,
  GetServerSidePropsContext,
  GetServerSidePropsResult
} from "next";
import jwt from "jsonwebtoken";

export const requireAuthentication =
  (gssp: GetServerSideProps) =>
  async (
    context: GetServerSidePropsContext
  ): Promise<GetServerSidePropsResult<Record<string, any>>> => {
    const { req } = context;

    // 쿠키에서 JWT 토큰 추출
    const token = req.cookies?.jwtToken;
    if (!token) {
      console.warn(
        "토큰이 존재하지 않습니다. 로그인 페이지로 리다이렉트합니다."
      );
      return {
        redirect: {
          destination: `${process.env.NEXT_PUBLIC_FRONTEND_URL}/login`,
          permanent: false
        }
      };
    }

    // JWT_SECRET 환경 변수 확인
    const secret = process.env.JWT_SECRET;
    if (!secret) {
      console.error("JWT_SECRET 환경 변수가 설정되지 않았습니다.");
      return {
        redirect: {
          destination: `${process.env.NEXT_PUBLIC_FRONTEND_URL}/login`,
          permanent: false
        }
      };
    }

    // 토큰 검증
    try {
      jwt.verify(token, secret);
    } catch (error) {
      // 에러 타입 명시적으로 지정
      if (error instanceof Error) {
        console.error(`토큰 검증 실패: ${error.message}`);
      } else {
        console.error("알 수 없는 에러 발생");
      }
      return {
        redirect: {
          destination: `${process.env.NEXT_PUBLIC_FRONTEND_URL}/login`,
          permanent: false
        }
      };
    }

    // gssp 실행 및 반환 값 안전 처리
    try {
      const gsspData = await gssp(context);
      return gsspData;
    } catch (error) {
      if (error instanceof Error) {
        console.error(`gssp 실행 중 에러 발생: ${error.message}`);
      } else {
        console.error("알 수 없는 에러 발생");
      }
      return {
        redirect: {
          destination: `${process.env.NEXT_PUBLIC_FRONTEND_URL}/login`,
          permanent: false
        }
      };
    }
  };
