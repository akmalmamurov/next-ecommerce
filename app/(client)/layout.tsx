import type { Metadata } from "next";
import localFont from "next/font/local"
import "../globals.css";
import { Header } from "@/components/header";
import { ClerkProvider } from "@clerk/nextjs";
import { Footer } from "@/components/footer";
import {Toaster} from "react-hot-toast"
const poppins = localFont({
  src: "../fonts/Poppins.woff2",
  variable: "--font-poppins",
  weight: "400",
  preload: false
});

export const metadata: Metadata = {
  title: "Ecommerce App",
  description: "Ecommerce website shoppers",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body
          className={`${poppins.variable} antialiased`}
        >
          <Header />
          {children}
          <Footer />
          <Toaster position="top-center" toastOptions={{
            style:{
              background: "#000000",
              color: "#FFFFFF"
            }
          }}/>
        </body>
      </html>
    </ClerkProvider>
  );
}
