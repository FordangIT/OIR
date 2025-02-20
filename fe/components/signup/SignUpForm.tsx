import { useState, useRef } from "react";
import { useRouter } from "next/router";
import { InputField } from "./InputField";
import Icon from "../common/Icon";
import { useMutation } from "react-query";
import { signup } from "@/lib/api/signup";
import { useSignUpForm } from "./useSignUpForm";
import { SubmitHandler } from "react-hook-form";
import { ErrorText } from "../../lib/utils/ErrorText";
import { CheckDoubleButton } from "../common/CheckDoubleButton";
import { checkUserId, checkNickname } from "@/lib/api/signup";
import ModalSchoolSearch from "./ModalSchoolSearch";

export interface SignUpFormData {
  school: {
    educationOfficeCode: string;
    schoolCode: string;
    schoolName: string;
    schoolKind: string;
  };
  userId: string;
  password: string;
  repassword: string;
  nickname: string;
}

export default function SignUpForm() {
  const router = useRouter();
  const modalRef = useRef<HTMLDialogElement>(null);

  const [selectedSchool, setSelectedSchool] = useState<
    SignUpFormData["school"]
  >({
    schoolName: "",
    educationOfficeCode: "",
    schoolCode: "",
    schoolKind: ""
  });

  const { register, handleSubmit, errors, getValues, setValue } =
    useSignUpForm();

  const signupMutation = useMutation(signup, {
    onSuccess: () => {
      alert("회원가입 되었습니다.");
      router.push("/login");
    },
    onError: () => {
      console.log("회원가입에 실패했습니다. 다시 시도해주세요");
    }
  });

  const onSubmit: SubmitHandler<SignUpFormData> = (data) => {
    if (!data.school || !data.school.schoolName) {
      alert("학교를 선택해주세요.");
      return;
    }

    signupMutation.mutate({
      ...data,
      school: {
        schoolName: selectedSchool.schoolName,
        educationOfficeCode: selectedSchool.educationOfficeCode,
        schoolCode: selectedSchool.schoolCode,
        schoolKind: selectedSchool.schoolKind
      }
    });
  };

  const openModal = () => {
    modalRef.current?.showModal();
  };
  const closeModal = () => {
    modalRef.current?.close();
  };

  const handleSelectSchool = (school: SignUpFormData["school"]) => {
    console.log(school, "선택된 학교 정보 확인"); // 디버깅용 로그
    setSelectedSchool(school);
    setValue("school", school, { shouldValidate: true });
    closeModal();
  };

  const handleCheckUserId = async () => {
    const userId = getValues("userId");
    try {
      const result = await checkUserId(userId);
      alert(result.message);
      if (!result.success) {
        setValue("userId", "");
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
        setValue("nickname", "");
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
        <div className="flex items-center">
          <input
            type="text"
            value={selectedSchool.schoolName}
            placeholder="학교"
            readOnly
            className="input w-full text-center"
          />
          <button
            type="button"
            className="btn ml-2 cursor-pointer"
            onClick={openModal}
          >
            검색
          </button>
          <dialog ref={modalRef} className="modal">
            <div className="modal-box">
              <ModalSchoolSearch
                onClose={closeModal}
                onSelectSchool={handleSelectSchool}
              />
            </div>
          </dialog>
        </div>
        {errors.school && (
          <p className="text-red-500">{errors.school.message}</p>
        )}
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
        disabled={signupMutation.isLoading}
      >
        {signupMutation.isLoading ? "회원가입 중..." : "승인 요청"}
      </button>
    </form>
  );
}
