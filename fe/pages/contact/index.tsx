import ContactForm from "@/components/contact/ContactForm";
import { requireAuthentication } from "@/lib/utils/requireAuthentication";
import { GetServerSideProps } from "next";

export const getServerSideProps: GetServerSideProps = async (context) => {
  return requireAuthentication(context);
};

export default function Contact() {
  return (
    <>
      <div className="col-position h-full w-full">
        <div className="py-2 mb-10 text-lg font-semibold">문의하기 </div>
        <ContactForm />
      </div>
    </>
  );
}
