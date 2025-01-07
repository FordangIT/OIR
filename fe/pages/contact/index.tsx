import ContactForm from "@/components/contact/ContactForm";
import { NextPage } from "next";

type ContactProps = {
  customMessage?: string;
};

const Contact: NextPage<ContactProps> = ({ customMessage }) => {
  return (
    <div className="col-position h-full w-full">
      <div className="py-2 mb-10 text-lg font-semibold">문의하기</div>
      {customMessage && <p>{customMessage}</p>}
      <ContactForm />
    </div>
  );
};

export default Contact;
