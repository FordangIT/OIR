import { useRouter } from "next/router";
import { InputField } from "./InputField";
import Icon from "../common/Icon";
import { useMutation } from "react-query";
import { signup } from "@/lib/api/signup";
import { useSignUpForm } from "./useSignUpForm";
import { SubmitHandler } from "react-hook-form";
import { ErrorText } from "../common/ErrorText";
import { CheckDoubleButton } from "../common/CheckDoubleButton";
import { checkUserId, checkNickname } from "@/lib/api/signup";
interface FormData {
  school: string;
  userId: string;
  password: string;
  repassword: string;
  nickname: string;
}

export default function SignUpForm() {
  const router = useRouter();
  const signupMutation = useMutation(signup, {
    onSuccess: () => {
      router.push("/login");
    },
    onError: () => {
      console.log("회원가입에 실패했습니다. 다시 시도해주세요");
    }
  });

  const { register, handleSubmit, errors, getValues, reset } = useSignUpForm();

  const onSubmit: SubmitHandler<FormData> = (data) => {
    signupMutation.mutate(data);
  };

  const handleCheckUserId = async () => {
    const userId = getValues("userId");
    try {
      const result = await checkUserId(userId);
      alert(result.message);
      if (!result.success) {
        reset();
      }
    } catch (error) {
      alert(`다시 시도하세요 ${error}`);
    }
  };

  const handleCheckNickname = async () => {
    const nickname = getValues("nickname");
    try {
      const result = await checkNickname(nickname);
      alert(result.message);
      if (!result.success) {
        reset();
      }
    } catch (error) {
      alert(`다시 시도하세요 ${error}`);
    }
  };

  return (
    <form
      className="flex flex-col justify-center items-center"
      onSubmit={handleSubmit(onSubmit)}
    >
      <div className="grid grid-cols-1 divide-y-2 my-3 w-full border-2 border-gray-200 rounded-md">
        <InputField
          id="school"
          placeholder="school(--중학교, --고등학교)"
          right={false}
          icon={<Icon name="school" className="w-6 h-6 text-tosslogo-gray" />}
          register={register("school", {
            required: "학교는 필수 항목입니다."
          })}
        />
        {errors.school && <ErrorText errors={errors.school.message} />}
      </div>

      <div className="grid grid-cols-1 divide-y-2 w-full my-10 border-2 border-gray-200 rounded-md">
        <div className="row-position">
          <InputField
            id="userId"
            placeholder="userId"
            right={false}
            icon={<Icon name="userId" className="w-6 h-6 text-tosslogo-gray" />}
            register={register("userId")}
          />
          <CheckDoubleButton
            onClick={handleCheckUserId}
            className="flex justify-end items-center text-black text-sm w-24 p-1 border row-position mr-1 rounded-md border-tosslogo-gray"
          />
        </div>
        {errors.userId && <ErrorText errors={errors.userId.message} />}

        <InputField
          id="password"
          placeholder="password"
          right={true}
          icon={<Icon name="password" className="w-6 h-6 text-tosslogo-gray" />}
          type="password"
          register={register("password")}
        />
        {errors.password && <ErrorText errors={errors.password.message} />}
        <InputField
          id="repassword"
          placeholder="password 확인"
          right={true}
          icon={
            <Icon name="repassword" className="w-6 h-6 text-tosslogo-gray" />
          }
          type="password"
          register={register("repassword")}
        />

        {errors.repassword && <ErrorText errors={errors.repassword.message} />}
        <div className="row-position">
          <InputField
            id="nickname"
            placeholder="nickname"
            right={false}
            icon={
              <Icon name="nickname" className="w-6 h-6 text-tosslogo-gray" />
            }
            register={register("nickname")}
          />
          <CheckDoubleButton
            onClick={handleCheckNickname}
            className="flex justify-end items-center text-black text-sm w-24 p-1 border row-position mr-1 rounded-md border-tosslogo-gray"
          />
        </div>
        {errors.nickname && <ErrorText errors={errors.nickname.message} />}
      </div>

      <button
        type="submit"
        className="w-full h-12 bg-main-orange font-semibold text-white rounded-md text-md"
      >
        승인 요청
      </button>
    </form>
  );
}
