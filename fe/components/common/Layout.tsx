import { ReactNode } from "react";

interface LayoutProps {
  children: ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  return (
    <>
      <div className="flex justify-center items-center min-h-screen w-full sm:w-[30rem] bg-white">
        {children}
      </div>
    </>
  );
}
