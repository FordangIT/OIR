import SendForm from "@/components/send/SendForm";
// import { requireAuthentication } from "@/lib/utils/requireAuthentication";
// import { GetServerSideProps } from "next";

// export const getServerSideProps: GetServerSideProps = async (context) => {
//   return requireAuthentication(context);
// };
export default function Send() {
  return (
    <div className="row-position h-full w-full">
      <SendForm />
    </div>
  );
}
