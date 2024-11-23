import ContactForm from "@/components/contact/ContactForm";
import { requireAuthentication } from "@/lib/utils/requireAuthentication";
import { GetServerSideProps } from "next";

export const getServerSideProps: GetServerSideProps = requireAuthentication(
  async (context) => {
    // 필요한 props 반환
    return {
      props: {} // 필요 시 다른 데이터를 추가
    };
  }
);

export default function Contact() {
  return (
    <>
      <div className="col-position h-full w-full">
        <div className="py-2 mb-10 text-lg font-semibold">문의하기</div>
        <ContactForm />
      </div>
    </>
  );
}
