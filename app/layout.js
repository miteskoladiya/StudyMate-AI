import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import {Outfit} from 'next/font/google'
import { ClerkProvider } from "@clerk/nextjs";
import Provider from "./provider";
import { Toaster } from "@/components/ui/sonner"


export const metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

const outfit=Outfit({subsets:['latin']})



export default function RootLayout({ children }) {
  return (
    <ClerkProvider>
    <html lang="en">
      <body className={outfit.className}>
        <Provider>
        {children}
        </Provider>
        <Toaster />

      </body>
    </html>
    </ClerkProvider>
  );
}
