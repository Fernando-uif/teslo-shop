import { titleFont } from "@/config/fonts";
import Link from "next/link";
import React from "react";

const Footer = () => {
  return (
    <div className="flex w-full justify-center text-xs mb-10 ">
      <Link href={"/"}>
        <span className={`${titleFont.className} antialiased font-bold`}>
          Teslo{" "}
        </span>
        <span>| shop </span>
        <span> {new Date().getFullYear()} </span>
      </Link>
      <Link className="ml-1" href={"/"}>
        Privacy
      </Link>
    </div>
  );
};

export default Footer;
