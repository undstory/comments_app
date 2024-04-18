import { createNewUser } from "@/lib/actions";
import Link from "next/link";
import LogRegButton from "../ui/login/LogRegButton";
export default function RegisterPage() {
    return (
<div>
<h2>Back to the home <Link href="/">here</Link></h2>
        <form action={createNewUser} style={{ display: "flex", flexDirection: "column", alignItems:"flex-start", justifyContent:"flex-start", gap: '10px'}}>
            <input name="username" id="username" type="text" minLength={3} required placeholder="Enter your username" />
            <input name="email" id="email" type="email" required placeholder="Enter your email address" />
            <input name="password" id="password" type="password" required minLength={6} placeholder="Enter your password" />
            <LogRegButton variant="register" />
        </form>
</div>
    );
}

