import "./styles/globals.css";
import StoreProvider from "./StoreProvider";
import { cn } from "@/libs/utils";
import { Analytics } from "@vercel/analytics/react";
import Modal from "@/components/UI/Modals/Modal";
import { Footer, Nav, Search } from "@/components/Layout";
import { Cart } from "@/components/Cart";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={cn("relative bg-darkness overflow-x-hidden h-[100vh]")}>
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
