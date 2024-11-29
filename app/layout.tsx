import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import { Providers } from "@/app/providers";
import "@/styles/globals.css";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Navbar from "@/components/globals/navbar";

const montserrat = Montserrat({
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  subsets: ["latin"],
  display: "swap",
  fallback: ["Arial", "sans-serif"],
  variable: "--font-montserrat",
});

export const metadata: Metadata = {
  title: "Xero",
  description: "Accounting Software",
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={montserrat.className} data-theme="light">
      <body>
        <Providers>
          <Navbar />
          {children}
          <ToastContainer autoClose={1300} />
        </Providers>
      </body>
    </html>
  );
}
