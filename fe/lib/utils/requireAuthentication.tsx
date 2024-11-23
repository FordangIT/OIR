import { parseCookies } from "nookies";
import { GetServerSidePropsContext, GetServerSidePropsResult } from "next";
import jwt from "jsonwebtoken";

export async function requireAuthentication(
  context: GetServerSidePropsContext
): Promise<GetServerSidePropsResult<Record<string, never>>> {
  const cookies = parseCookies(context);
  const token = cookies.jwtToken;

  if (!token) {
    console.log("토큰 없음!");
    return {
      redirect: {
        destination: `${process.env.NEXT_PUBLIC_FRONTEND_URL}/login`,
        permanent: false
      }
    };
  }

  const secret = process.env.JWT_SECRET;
  if (!secret) {
    throw new Error("JWT_SECRET 환경 변수가 설정되지 않았습니다.");
  }
  try {
    jwt.verify(token, secret);
  } catch (error) {
    console.log(`${error}: 유효하지 않은 토큰입니다.`);
    return {
      redirect: {
        destination: `${process.env.NEXT_PUBLIC_FRONTEND_URL}/login`,
        permanent: false
      }
    };
  }
  return {
    props: {}
  };
}
