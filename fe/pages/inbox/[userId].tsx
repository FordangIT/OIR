import InboxList from "@/components/inbox/InboxList";
// import { requireAuthentication } from "@/lib/utils/requireAuthentication";
// import { GetServerSideProps } from "next";

// export const getServerSideProps: GetServerSideProps = async (context) => {
//   return requireAuthentication(context);
// };
export default function Inbox() {
  return (
    <>
      <InboxList />
    </>
  );
}
