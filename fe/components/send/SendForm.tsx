import { ChangeEvent, FormEvent, useState } from "react";
import InputField from "../common/InputField";
import { useMutation } from "react-query";
import { sendMessage } from "@/lib/api/send";
import { MessageForm } from "@/lib/api/send";
import { useRouter } from "next/router";
interface FormData {
  recipient: string;
  content: string;
}

export default function SendForm() {
  const router = useRouter();
  const [formData, setFormData] = useState<FormData>({
    recipient: "",
    content: ""
  });

  const { mutate } = useMutation(
    (newMessage: MessageForm) => sendMessage(newMessage),
    {
      onSuccess: () => {
        alert("메시지가 성공적으로 전송되었습니다.");
        setFormData({ recipient: "", content: "" });
      },
      onError: (error) => {
        alert(`${error}`);
        router.push("/points");
      }
    }
  );

  const handleChange = (
    e: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value
    }));
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    mutate({
      recipientId: formData.recipient,
      content: formData.content
    });
  };
  return (
    <div className="w-full h-96 border-2 bg-main-green p-3">
      <form onSubmit={handleSubmit} className="flex flex-col h-full">
        <InputField
          type="text"
          id="recipient"
          name="recipient"
          value={formData.recipient}
          onChange={handleChange}
          placeholder="받는 사람 ID"
          required
          className="h-10 outline-none p-2"
        />
        <textarea
          id="content"
          name="content"
          value={formData.content}
          onChange={handleChange}
          placeholder="당신의 진심을 전해보세요"
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
