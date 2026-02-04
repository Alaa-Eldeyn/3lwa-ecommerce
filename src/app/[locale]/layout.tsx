import type { Metadata } from "next";
import { Cairo } from "next/font/google";
import { getMessages } from "next-intl/server";
import "./globals.css";
import Providers from "@/src/providers/Providers";
import { NextIntlClientProvider } from "next-intl";
import { Suspense } from "react";
import Loading from "./loading";

const cairoFont = Cairo({
  subsets: ["arabic", "latin"],
  variable: "--font-cairo",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Basit",
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
  const isArabic = locale === "ar";
  
  return (
    <html
      lang={locale}
      dir={isArabic ? "rtl" : "ltr"}
      suppressHydrationWarning
    >
      <head>
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css"
        />
      </head>
      <body
        className={`${cairoFont.variable} antialiased font-cairo `}
        suppressHydrationWarning
      >
        <NextIntlClientProvider messages={messages}>
        <Providers>
          <Suspense fallback={<Loading />}>{children}</Suspense>
        </Providers>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
