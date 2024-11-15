import { UseFormRegisterReturn } from "react-hook-form";

interface InputFieldProps {
  id: string;
  placeholder: string;
  icon: React.ReactNode;
  type?: string;
  isRequired?: boolean;
  register?: UseFormRegisterReturn;
  right: boolean;
}

export const InputField = ({
  id,
  placeholder,
  icon,
  type = "text",
  register,
  right,
  isRequired = false
}: InputFieldProps) => (
  <div className="flex flex-row w-full h-12 justify-center items-center ">
    <label className="flex items-center justify-center text-gray-700 w-8 h-8 m-5">
      {icon}
    </label>
    <input
      type={type}
      id={id}
      placeholder={placeholder}
      {...register}
      required={isRequired}
      className={`w-full h-full focus:border focus:border-main-green focus:outline-none text-center transition duration-300 ease-in-out${
        right ? " mr-20" : ""
      }`}
      maxLength={20}
    />
  </div>
);
