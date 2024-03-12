import { titleFont } from "@/config/fonts";
import Image from "next/image";

export default function Home() {
  return (
    <main className="">
     <h1>Hello</h1>
     <h2 className={titleFont.className}>Hola mundo</h2>
    </main>
  );
}
