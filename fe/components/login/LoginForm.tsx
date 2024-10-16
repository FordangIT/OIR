import { useState, ChangeEvent, FormEvent } from "react";
import { useRouter } from "next/router";

interface FormData {
  userid: string;
  password: string;
}

export default function LoginForm() {
  const [formData, setFormData] = useState<FormData>({
    userid: "",
    password: ""
  });
  const [error, setError] = useState<string>("");
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

    if (!formData.userid || !formData.password) {
      setError("아이디와 비밀번호 모두 작성해주세요");
      return;
    }

    router.push("/");
  };
  return (
    <form onSubmit={handleSubmit} className="">
      <div>
        <label></label>
        <input
          type="text"
          id="userid"
          name="userid"
          value={formData.userid}
          onChange={handleChange}
          required
        ></input>
      </div>
      <div>
        <label></label>
        <input
          type="text"
          id="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          required
        ></input>
      </div>
      {error && <p>{error}</p>}
      <button type="submit">로그인</button>
    </form>
  );
}
