import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { validationSchema } from "./ValidationSchema";

export const useSignUpForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    getValues,
    reset
  } = useForm({
    resolver: yupResolver(validationSchema),
    mode: "onChange"
  });
  return {
    register,
    handleSubmit,
    errors,
    getValues,
    reset
  };
};
