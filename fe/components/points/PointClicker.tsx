import Image from "next/image";
import { useState } from "react";
import { RootState } from "@/lib/redux/store";
import { useSelector, useDispatch } from "react-redux";
import { increment } from "@/lib/redux/slices/counterSlice";

export default function PointClicker() {
  const count = useSelector((state: RootState) => state.counter.value);
  const dispatch = useDispatch();

  const [state, setState] = useState(true);

  const handleCount = () => {
    dispatch(increment());

    setState(false);
    setTimeout(() => setState(true), 100);
  };
  return (
    <>
      <div className="col-position">
        <div className="w-fit h-10 px-2 mb-5 bg-main-green rounded-xl row-position text-white font-semibold">
          {count}
        </div>
        {state ? (
          <Image
            src={`/images/click1.jpeg`}
            alt="포인트 충전"
            height={150}
            width={150}
            onClick={handleCount}
          />
        ) : (
          <Image
            src={`/images/click2.jpeg`}
            alt="포인트 충전"
            height={150}
            width={150}
            onClick={handleCount}
          />
        )}
      </div>
    </>
  );
}
