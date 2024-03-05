import "./styles/globals.css";
import { Footer, Modal, Nav, Search, Cart } from "@/components";
import StoreProvider from "./StoreProvider";
import { cn } from "@/libs/utils";
import { Analytics } from "@vercel/analytics/react";
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
