interface TextProps {
  text: string;
}
export default function TextInfo({ text }: TextProps) {
  return (
    <div className="w-full h-full absolute inset-0 -top-10 flex justify-center items-center opacity-0 group-hover:opacity-80 transition-opacity duration-300">
      <div className="w-fit h-fit px-1 text-xs bg-gray-800 text-white">
        {text}
      </div>
    </div>
  );
}
