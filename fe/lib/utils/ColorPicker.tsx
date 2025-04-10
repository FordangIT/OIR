import React from "react";

interface ColorOption {
  name: string;
  value: string;
  bg: string;
}
const COLORS: ColorOption[] = [
  { name: "핑크", value: "pink", bg: "bg-pink-200" },
  { name: "블루", value: "sky", bg: "bg-sky-200" },
  { name: "민트", value: "teal", bg: "bg-teal-200" },
  { name: "노랑", value: "yellow", bg: "bg-yellow-200" },
  { name: "보라", value: "purple", bg: "bg-purple-200" },
  { name: "주황", value: "orange", bg: "bg-orange-200" },
  { name: "회색", value: "zinc", bg: "bg-zinc-200" },
  { name: "흰색", value: "white", bg: "bg-white" }
];

interface Props {
  color: string;
  onChange: (color: string) => void;
}
const ColorPicker: React.FC<Props> = ({ color, onChange }) => {
  return (
    <div className="flex gap-x-2  h-full w-full">
      {COLORS.map((c) => (
        <button
          key={c.value}
          onClick={() => onChange(c.value)}
          className={`flex-1 h-full rounded-md border-2 ${
            color === c.value ? "border-black" : "border-gray-100 border-[1px]"
          } ${c.bg}`}
          aria-label={c.name}
        ></button>
      ))}
    </div>
  );
};

export default ColorPicker;
