import React from "react";
import TugasPage from "./page";
import {Metadata} from "next";

export const metadata: Metadata = {
  title: "Tugas",
};

export default function TugasLayout() {
  return (
    <>
      <TugasPage />
    </>
  );
}
