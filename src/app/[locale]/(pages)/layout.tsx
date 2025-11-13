import Footer from "@/src/components/footer";
import Header from "@/src/components/header";

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <Header />
        {children}
      <Footer />
    </>
  );
}
