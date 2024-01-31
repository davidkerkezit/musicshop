import type { Metadata } from "next";
import "./styles/globals.css";
import { Footer, Modal, Nav, Search } from "@/components";
import StoreProvider from "./StoreProvider";
import Cart from "@/components/Cart";
// import { Lato } from "next/font/google";
import { cn } from "@/libs/utils";

export const metadata: Metadata = {
  title: "Music Shop | Home",

  description: "Feel Our Vibe",
};
// const lato = Lato({
//   weight: ["100", "300", "400", "700", "900"],
//   style: ["normal", "italic"],
//   subsets: ["latin"],
//   display: "swap",
//   variable: "--font-lato",
// });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        className={cn(
          "relative bg-darkness overflow-x-hidden h-full  "
          // lato.variable
        )}
      >
        <StoreProvider>
          <Modal />
          <Nav />
          <Search />
          <Cart />
          <div className="">{children}</div>
          <Footer />
        </StoreProvider>
      </body>
    </html>
  );
}
