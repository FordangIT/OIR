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
  <div className="flex  flex-row w-full h-12 justify-center items-center ">
    <label className="basis-1/4 flex items-center justify-center text-gray-700 w-8 h-8 m-3">
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
      className="basis-3/4 mr-5 focus:border focus:border-main-green hover:border-main-green focus:outline-none text-center"
      maxLength={20}
    />
  </div>
);
