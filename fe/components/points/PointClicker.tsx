import Image from "next/image";
import { useState } from "react";
import { RootState } from "@/lib/redux/store";
import { useSelector, useDispatch } from "react-redux";
import { increment, reset } from "@/lib/redux/slices/counterSlice";
import { useMutation, useQueryClient } from "react-query";
import { updateUserPoints } from "@/lib/api/points";

export default function PointClicker() {
  const count = useSelector((state: RootState) => state.counter.value);
  const dispatch = useDispatch();
  const queryClient = useQueryClient();

  const [state, setState] = useState(true);
  const mutation = useMutation(updateUserPoints, {
    onSuccess: () => {
      queryClient.invalidateQueries("userPoints");
    }
  });

  const handleCount = () => {
    dispatch(increment());

    setState(false);
    setTimeout(() => setState(true), 100);
  };

  const handleImageClick = () => {
    const points = Math.floor(count / 10);
    if (points > 0) {
      mutation.mutate(points);
      dispatch(reset());
    }
  };
  return (
    <>
      <div className="col-position">
        <div className="w-fit h-fit p-1 bg-main-green rounded-full row-position text-white font-semibold text-sm mb-2">
          {count}
        </div>
        <div className="mb-3">
          {Number(count) >= 10 ? (
            <Image
              src="/images/open.jpeg"
              alt="보물상자 open"
              width={70}
              height={70}
              onClick={handleImageClick}
            />
          ) : (
            <Image
              src="/images/close.jpeg"
              alt="보물상자 close"
              width={60}
              height={60}
            />
          )}
        </div>
        <div className="relative">
          <div
            className={`absolute right-0 font-bold text-main-red ${
              state ? "block" : "hidden"
            }`}
          >
            click
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
      </div>
    </>
  );
}
