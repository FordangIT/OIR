import Image from "next/image";
import { useState } from "react";

export default function Points() {
  const [state, setState] = useState(false);
  const [cnt, setCnt] = useState<number>(0);

  const handleCount = () => {
    const plus = cnt + 1;
    setCnt(plus);
    if (plus === 10) {
      //이때 point 1적립
    }
    setState(true);
    setState(false);
    console.log(state);
  };
  return (
    <>
      <div className="relative">
        <div
          className="w-10 h-10 absolute top-0 right-0 bg-main-green rounded-xl row-position text-white font-semibold"
          onClick={handleCount}
        >
          {cnt}
        </div>
        {state ? (
          <Image
            src={`/images/click1.jpeg`}
            alt="포인트 충전"
            height={150}
            width={150}
          />
        ) : (
          <Image
            src={`/images/click2.jpeg`}
            alt="포인트 충전"
            height={150}
            width={150}
          />
        )}
      </div>
    </>
  );
}
