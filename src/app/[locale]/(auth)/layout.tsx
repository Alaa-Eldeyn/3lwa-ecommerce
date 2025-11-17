import Header from "@/src/components/header";
import React from "react";

const layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <Header />
      <main className="pt-20">
      {children}
      </main>
    </>
  );
};

export default layout;
