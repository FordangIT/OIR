import ContactForm from "@/components/contact/ContactForm";
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
