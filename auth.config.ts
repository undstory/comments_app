import type { NextAuthConfig } from "next-auth";

export const authConfig = {
  pages: {
    signIn: "/login",
    signOut: "/",
  },
  callbacks: {
    authorized({ auth, request: { nextUrl } }) {
      const isLoggedIn = !!auth?.user; // Checking if the user is logged in
      const isOnComments = nextUrl.pathname.startsWith("/comments"); // Determining if the user is currently on the comments page
      if (isOnComments) {
        if (isLoggedIn) return true;
        return false; // Redirect unauthenticated users to login page (do signIn albo do signout jak jest okreslone)
      } else if (isLoggedIn) {
        // return Response.redirect(new URL("/comments", nextUrl));
        const isOnAuth =
          nextUrl.pathname === "/login" || nextUrl.pathname === "/register";
        if (isOnAuth) return Response.redirect(new URL("/comments", nextUrl));
        return true;
      }
      return true;
    },
  },
  providers: [], // Add providers with an empty array for now
} satisfies NextAuthConfig;
