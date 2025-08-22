import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import {Metadata} from "next";
import React, {ReactNode} from "react";

export const metadata: Metadata = {
  title: "Mata Pelajaran",
};

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
