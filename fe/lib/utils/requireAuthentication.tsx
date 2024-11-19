import { parseCookies } from "nookies";
import { GetServerSidePropsContext, GetServerSidePropsResult } from "next";

export async function requireAuthentication(
  context: GetServerSidePropsContext
): Promise<GetServerSidePropsResult<Record<string, never>>> {
  const cookies = parseCookies(context);
  const token = cookies.jwtToken;

  if (!token) {
    console.log("token이 없습니다.");
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
