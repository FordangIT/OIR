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
        {Number(count) >= 10 ? (
          <Image
            src="/images/open.png"
            alt="보물상자 open"
            width={44}
            height={44}
            onClick={handleImageClick}
          />
        ) : (
          <Image
            src="/images/close.png"
            alt="보물상자 close"
            width={44}
            height={44}
          />
        )}
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
