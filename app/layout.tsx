import type { Metadata } from "next";
import "./styles/globals.css";
import { Footer, Modal, Nav, Search } from "@/components";
import StoreProvider from "./StoreProvider";
import Cart from "@/components/Cart";
import { Lato } from "next/font/google";
import { cn } from "@/libs/utils";

export const metadata: Metadata = {
  title: "Music Shop | Home",

  description: "Feel Our Vibe",
};
const lato = Lato({ subsets: ["latin"], weight: "400" });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="h-full">
      <body
        className={cn(
          "relative bg-darkness overflow-x-hidden h-ful antialiased",
          lato.className
        )}
      >
        <StoreProvider>
          <Modal />
          <Nav />
          <Search />
          <Cart />
          <div>{children}</div>
          <Footer />
        </StoreProvider>
      </body>
    </html>
  );
}
