import type { Metadata } from "next";
import { Cairo } from "next/font/google";
import { getMessages } from "next-intl/server";
import "./globals.css";

const cairoFont = Cairo({
  subsets: ["arabic", "latin"],
  variable: "--font-cairo",
  display: "swap",
});

export const metadata: Metadata = {
  title: "3lwa's E-commerce",
  description: "Generalized e-commerce platform for all your needs.",
  authors: [{ name: "Alaa Eldeyn", url: "https://3lwa88.vercel.app/" }],
};

export default async function RootLayout({
  children,
  params
}: Readonly<{
  children: React.ReactNode;
  params: Promise<{ locale: string }>
}>) {
  const messages = await getMessages();

  const { locale } = await params;

  return (
    <html
      lang={locale}
      dir={locale === "ar" ? "rtl" : "ltr"}
      suppressHydrationWarning
    >
      <body
        className={`${cairoFont.variable} antialiased font-cairo`}
        suppressHydrationWarning
      >
        {children}
      </body>
    </html>
  );
}
