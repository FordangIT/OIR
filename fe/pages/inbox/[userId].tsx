import InboxList from "@/components/inbox/InboxList";
import withAuth from "@/lib/utils/withAuth";

const Inbox = () => {
  return (
    <>
      <InboxList />
    </>
  );
};

export default withAuth(Inbox);
