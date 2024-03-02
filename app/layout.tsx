import { Analytics } from "@vercel/analytics/react";

import type { Metadata } from "next";
import "./styles/globals.css";
import { Footer, Modal, Nav, Search } from "@/components";
import StoreProvider from "./StoreProvider";
import Cart from "@/components/Cart";
// import { Lato } from "next/font/google";
import { cn } from "@/libs/utils";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        className={cn(
          "relative bg-darkness overflow-x-hidden h-[100vh]   "
          // lato.variable
        )}
      >
        <StoreProvider>
          <Analytics />
          <Modal />
          <Nav />
          <Search />
          <Cart />

          <div className="overflow-y-hidden">{children}</div>
          <Footer />
        </StoreProvider>
      </body>
    </html>
  );
}
