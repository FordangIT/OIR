import * as Yup from "yup";

export const validationSchema = Yup.object().shape({
  school: Yup.object().shape({
    educationOfficeCode:
      Yup.string().required("시도교육청 코드를 입력해주세요."),
    schoolCode: Yup.string().required("학교 코드를 입력해주세요."),
    schoolName: Yup.string().required("학교 이름을 입력해주세요."),
    schoolKind: Yup.string().required("학교 종류를 선택해주세요.")
  }),
  userId: Yup.string()
    .matches(/^[a-z0-9]+$/, "아이디는 영소문자와 숫자만 허용됩니다.")
    .required("아이디는 필수 항목입니다."),
  password: Yup.string()
    .min(8, "비밀번호는 최소 8자 이상이어야 합니다.")
    .required("비밀번호는 필수 항목입니다."),
  repassword: Yup.string()
    .oneOf([Yup.ref("password"), undefined], "비밀번호가 일치해야 합니다.")
    .required("비밀번호 확인은 필수 항목입니다. "),
  nickname: Yup.string()
    .matches(
      /^[\uac00-\ud7a3a-z0-9]+$/,
      "닉네임은 한글, 영소문자, 숫자만 허용됩니다."
    )
    .min(3, "닉네임은 최소 3자 이상이어야 합니다. ")
    .required("닉네임은 필수 항목입니다. ")
});
