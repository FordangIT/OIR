import InboxList from "@/components/inbox/InboxList";

export default function Inbox() {
  return (
    <div className="w-full min-h-screen overflow-y-auto bg-tossback-gray">
      <div className="text-black z-10">받은 편지함</div>
      <InboxList />;
    </div>
  );
}
