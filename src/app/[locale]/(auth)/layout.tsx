import Header from "@/src/components/common/header";
import React from "react";

const layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <Header />
      <main className="">
      {children}
      </main>
    </>
  );
};

export default layout;
