import { useState, ChangeEvent, FormEvent } from "react";
import { useRouter } from "next/router";
import { InputField } from "./InputField";
import Icon from "../common/Icon";

interface FormData {
  school: string;
  grade: string;
  username: string;
  userid: string;
  password: string;
  repassword: string;
  nickname: string;
}

export default function SignUpForm() {
  const [formData, setFormData] = useState<FormData>({
    school: "",
    grade: "",
    username: "",
    userid: "",
    password: "",
    repassword: "",
    nickname: ""
  });
  const router = useRouter();

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value
    }));
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    router.push("/");
  };
  return (
    <form
      className="flex flex-col justify-center items-center min-h-screen"
      onSubmit={handleSubmit}
    >
      <div className="grid grid-cols-1 divide-y-2 my-3 border-2 border-gray-200 rounded-md">
        <InputField
          id="school"
          name="school"
          value={formData.school}
          onChange={handleChange}
          placeholder="school"
          icon={<Icon name="school" className="w-6 h-6 text-tosslogo-gray" />}
        />
        <InputField
          id="grade"
          name="grade"
          value={formData.grade}
          onChange={handleChange}
          placeholder="grade"
          icon={<Icon name="grade" className="w-6 h-6 text-tosslogo-gray" />}
        />
        <InputField
          id="username"
          name="username"
          value={formData.username}
          onChange={handleChange}
          placeholder="name"
          icon={<Icon name="username" className="w-6 h-6 text-tosslogo-gray" />}
        />
      </div>

      <div className="grid grid-cols-1 divide-y-2 my-10 border-2 border-gray-200 rounded-md">
        <InputField
          id="userid"
          name="userid"
          value={formData.userid}
          onChange={handleChange}
          placeholder="id"
          icon={<Icon name="userid" className="w-6 h-6 text-tosslogo-gray" />}
        />
        <InputField
          id="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          placeholder="password"
          icon={<Icon name="password" className="w-6 h-6 text-tosslogo-gray" />}
        />
        <InputField
          id="repassword"
          name="repassword"
          value={formData.repassword}
          onChange={handleChange}
          placeholder="password 확인"
          icon={
            <Icon name="repassword" className="w-6 h-6 text-tosslogo-gray" />
          }
        />
        <InputField
          id="nickname"
          name="nickname"
          value={formData.nickname}
          onChange={handleChange}
          placeholder="nickname"
          icon={<Icon name="nickname" className="w-6 h-6 text-tosslogo-gray" />}
        />
      </div>

      <button
        type="submit"
        className="w-full h-12 bg-main-orange font-semibold text-white rounded-md text-lg my-5"
      >
        승인 요청
      </button>
    </form>
  );
}
