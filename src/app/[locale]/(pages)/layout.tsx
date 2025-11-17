import Footer from "@/src/components/footer";
import Header from "@/src/components/header";
import { Suspense } from "react";
import Loading from "../loading";

export default async function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode
}>) {

  return (
    <>
      <Header />
        <Suspense fallback={<Loading />}>
          {children}
        </Suspense>
      <Footer />
    </>
  );
}
