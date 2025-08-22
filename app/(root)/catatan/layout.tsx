import React from "react";
import CatatanPage from "./page";
import {Metadata} from "next";
export const metadata: Metadata = {
  title: "Catatan",
};
export default function CatatanLayout() {
  return (
    <>
      <CatatanPage />
    </>
  );
}
