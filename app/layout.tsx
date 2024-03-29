import "./styles/globals.css";
import StoreProvider from "./StoreProvider";
import { cn } from "@/libs/utils";
import { Analytics } from "@vercel/analytics/react";
import Modal from "@/components/UI/Modals/Modal";
import { Footer, Nav, Search } from "@/components/Layout";
import { Cart } from "@/components/Cart";
import MenuMobile from "@/components/Layout/MenuMobile";
import DashboardNav from "@/components/Layout/DashboardNav";

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
          <MenuMobile />

          <Search />
          <Cart />
          <div className="overflow-y-hidden">{children}</div>
          <DashboardNav />
          <Footer />
        </StoreProvider>
      </body>
    </html>
  );
}
