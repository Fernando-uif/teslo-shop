import Link from "next/link";

export default function NotFoundPage() {
  return (
    <div>
      <h1>404</h1>
      <Link href={"/"}>Home</Link>
    </div>
  );
}
