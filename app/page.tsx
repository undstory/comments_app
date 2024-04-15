import Link from "next/link";


export default function Home() {
  return (
  <div>
    <h2>Hello Comments App</h2>
    <p>If you already have an accout, please log in <Link href="/login">here</Link></p>
    <p>If you have not an account yet, please register<Link href="/register">here</Link></p>
  </div>
  );
}
