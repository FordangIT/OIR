import { useState, ChangeEvent, FormEvent } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import { useMutation } from "react-query";
import { login } from "@/lib/api/login";
import { useDispatch } from "react-redux";
import { setUserId } from "@/lib/redux/slices/authSlice";

export interface FormData {
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
  const dispatch = useDispatch();
  const loginMutation = useMutation(login, {
    onSuccess: (result) => {
      dispatch(setUserId(result.data));
      router.push("/");
    },
    onError: (error) => {
      if (error instanceof Error) {
        setError(error.message);
      }
      setError("로그인에 실패했습니다. 다시 시도해 주세요");
    }
  });

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
    loginMutation.mutate(formData);
  };
  return (
    <form
      onSubmit={handleSubmit}
      className="w-96 flex flex-col justify-center items-center"
    >
      <div className="">
        <div className="my-10 w-full">
          <div>
            <input
              type="text"
              id="userid"
              name="userid"
              value={formData.userid}
              onChange={handleChange}
              placeholder="아이디"
              required
              className="w-full h-12 border-tossback-gray border-2 rounded-t-xl p-4 text-sm focus:outline-main-orange"
            ></input>
          </div>
          <div>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="비밀번호"
              required
              className="w-full h-12 border-tossback-gray border-x-2 border-b-2 rounded-b-xl p-4 text-sm  focus:outline-main-orange"
            ></input>
          </div>
          {error && <p className="text-main-red text-sm p-2">{error}</p>}
        </div>
        <button
          type="submit"
          className="bg-main-green text-white font-semibold w-full h-12 rounded-lg"
        >
          로그인
        </button>
        <Link href="/signup">
          <div className="text-gray-500 text-xs p-3 text-center">회원가입</div>
        </Link>
      </div>
    </form>
  );
}
