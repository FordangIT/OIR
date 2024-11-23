import InboxList from "@/components/inbox/InboxList";
import { requireAuthentication } from "@/lib/utils/requireAuthentication";
import { GetServerSideProps } from "next";

export const getServerSideProps: GetServerSideProps = async (context) => {
  context.res.setHeader(
    "Cache-Control",
    "no-store, no-cache, must-revalidate, proxy-revalidate"
  );
  return requireAuthentication(context);
};
export default function Inbox() {
  return (
    <>
      <InboxList />
    </>
  );
}
