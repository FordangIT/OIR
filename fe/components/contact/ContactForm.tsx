import { ChangeEvent, FormEvent, useState } from "react";
import { useMutation } from "react-query";
import { contact } from "@/lib/api/contact";
interface FormData {
  content: string;
}

export default function ContactForm() {
  const [formData, setFormData] = useState<FormData>({
    content: ""
  });

  const { mutate } = useMutation((newData: FormData) => contact(newData), {
    onSuccess: () => {
      alert("빠른 시일내에 고치겠습니다!");
      setFormData({ content: "" });
    },
    onError: (error) => {
      alert(`문의에 실패했습니다: ${error}`);
    }
  });

  const handleChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value
    }));
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    mutate({
      content: formData.content
    });
  };
  return (
    <div className="w-full h-96 border-2 bg-black p-3">
      <form onSubmit={handleSubmit} className="flex flex-col h-full">
        <textarea
          id="content"
          name="content"
          value={formData.content}
          onChange={handleChange}
          placeholder="개발자는 의견을 항상 기다리는 중 입니당구리~ 🍏 🍎 🍐 🍊 🍋 🍌 🍉 🍇 🍓 🫐"
          required
          className="h-full outline-none p-1 font-lg"
        />
        <div className="flex justify-end items-center mt-3 h-10">
          <button
            type="submit"
            className="w-fit px-3 rounded-xl bg-main-orange text-white py-2 font-semibold text-xs"
          >
            전송
          </button>
        </div>
      </form>
    </div>
  );
}
