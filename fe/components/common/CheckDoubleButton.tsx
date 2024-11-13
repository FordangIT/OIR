import React from "react";

interface CheckDoubleButtonProps {
  onClick: () => void;
  className: string;
}

export const CheckDoubleButton = ({
  onClick,
  className
}: CheckDoubleButtonProps) => {
  return (
    <button type="button" onClick={onClick} className={className}>
      중복 확인
    </button>
  );
};
