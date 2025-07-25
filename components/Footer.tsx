import Link from "next/link";
import React from "react";

export default function Footer() {
  return (
    <footer className="flex h-16 items-center justify-center mt-auto">
      <span className="text-muted-foreground">
        &copy; {new Date().getFullYear()}{" "}
        <Link
          href="https://romeoaditya.vercel.app/"
          className="underline hover:text-black"
        >
          romeoaditya
        </Link>
      </span>
    </footer>
  );
}
