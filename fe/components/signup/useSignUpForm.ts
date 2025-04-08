import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { validationSchema } from "./ValidationSchema";
import { SignUpFormData } from "./SignUpForm";

export const useSignUpForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    getValues,
    setValue
  } = useForm<SignUpFormData>({
    resolver: yupResolver(validationSchema),
    mode: "onChange"
  });
  return {
    register,
    handleSubmit,
    errors,
    getValues,
    setValue
  };
};
