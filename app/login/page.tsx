'use client';

import { authenticate } from "@/lib/actions";
import Link from "next/link";
import { useFormState } from "react-dom";

export default function LoginPage() {
    const [errorMessage, dispatch] = useFormState(authenticate, undefined);
    return (
        <div>
        <h2>Back to the home <Link href="/">here</Link></h2>
        <form action={dispatch} style={{ display: "flex", flexDirection: "column", alignItems:"flex-start", justifyContent:"flex-start", gap: '10px'}}>
            <input name="email" placeholder="email" />
            <input name="password" placeholder="password" />
            <button type="submit">Log in</button>
            {errorMessage && (
            <>
              <p className="text-sm text-red-500">{errorMessage}</p>
            </>
          )}
        </form>
        </div>
    );
}