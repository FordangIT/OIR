import { ChangeEvent } from "react";
interface InputProps {
  type: string;
  id: string;
  name: string;
  value: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  placeholder: string;
  required: boolean;
  className: string;
}
export default function InputField({
  type,
  id,
  name,
  value,
  onChange,
  placeholder,
  required,
  className
}: InputProps) {
  return (
    <input
      type={type}
      id={id}
      name={name}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      required={required}
      className={className}
    />
  );
}
