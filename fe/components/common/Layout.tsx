import { ReactNode } from "react";

interface LayoutProps {
  children: ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  return (
    <>
      <div className="flex justify-center min-h-screen bg-white">
        {children}
      </div>
    </>
  );
}
