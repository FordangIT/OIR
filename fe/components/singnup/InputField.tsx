import { ChangeEvent } from "react";

interface InputFieldProps {
  id: string;
  name: string;
  value: string;
  placeholder: string;
  icon: React.ReactNode;
  type?: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  isRequired?: boolean;
}

export const InputField = ({
  id,
  name,
  value,
  placeholder,
  icon,
  type = "text",
  onChange,
  isRequired = false
}: InputFieldProps) => (
  <div className="flex flex-row w-full h-12 justify-center items-center ">
    <label className="flex items-center justify-center text-gray-700 w-8 h-8 m-5">
      {icon}
    </label>
    <input
      type={type}
      id={id}
      name={name}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      required={isRequired}
      className="w-full h-full focus:border focus:border-main-green focus:outline-none text-center transition duration-300 ease-in-out"
      maxLength={20}
    />
  </div>
);
