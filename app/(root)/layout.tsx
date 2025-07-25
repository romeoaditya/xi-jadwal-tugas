import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import TabDays from "@/components/TabDays";
import React, {ReactNode} from "react";

const RootLayout = async ({children}: {children: ReactNode}) => {
  return (
    <div className="root-layout">
      <Navbar />
      <div className="min-h-screen flex flex-col">
        <main className="flex-grow">{children}</main>
        <hr />
        <Footer />
      </div>
    </div>
  );
};
export default RootLayout;
