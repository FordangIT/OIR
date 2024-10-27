import { ChangeEvent, FormEvent, useState } from "react";
import InputField from "../common/InputField";
interface FormData {
  recipient: string;
  content: string;
  isAnonymous: string;
}

export default function SendForm() {
  const [formData, setFormData] = useState<FormData>({
    recipient: "",
    content: "",
    isAnonymous: "anonymous"
  });
  const [error, setError] = useState<string>("");

  const handleChange = (
    e: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value
    }));
  };

  const handleRadioChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      isAnonymous: value
    }));
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!formData.recipient) {
      setError("받는 사람 id를 작성해주세요");
    } else if (!formData.content) {
      setError("내용을 작성해주세요");
    }
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
          className="basis-2/8 outline-none p-2"
        />
        <textarea
          id="content"
          name="content"
          value={formData.content}
          onChange={handleChange}
          placeholder="당신의 진심을 전해보세요"
          required
          className="basis-4/8 outline-none p-1 font-lg"
        />
        <div className="flex justify-end basis-1/8 p-1">
          <label>
            익명
            <input
              type="radio"
              name="isAnonymous"
              value="anonymous"
              checked={formData.isAnonymous === "anonymous"}
              onChange={handleRadioChange}
            />
          </label>
          <label className="ml-2">
            실명
            <input
              type="radio"
              name="isAnonymous"
              value="realname"
              checked={formData.isAnonymous === "realname"}
              onChange={handleRadioChange}
            />
          </label>
        </div>
        <button
          type="submit"
          className="basis-1/8 w-fit rounded-xl bg-main-orange text-white p-2 font-semibold text-xs"
        >
          전송
        </button>
      </form>
    </div>
  );
}
