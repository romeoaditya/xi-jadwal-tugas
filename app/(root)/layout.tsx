import Navbar from "@/components/Navbar";
import TabDays from "@/components/TabDays";
import React, {ReactNode} from "react";

const RootLayout = async ({children}: {children: ReactNode}) => {
  return (
    <div className="root-layout">
      <Navbar />

      {children}
    </div>
  );
};
export default RootLayout;
