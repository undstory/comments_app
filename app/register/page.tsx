import { createNewUser } from "@/lib/actions";
import Link from "next/link";
export default function RegisterPage() {
    return (
<div>
<h2>Back to the home <Link href="/">here</Link></h2>
        <form action={createNewUser} style={{ display: "flex", flexDirection: "column", alignItems:"flex-start", justifyContent:"flex-start", gap: '10px'}}>
            <input name="username" placeholder="username" />
            <input name="email" placeholder="email" />
            <input name="password" placeholder="password" />
            <button type="submit">Register</button>
        </form>
</div>
    );
}

