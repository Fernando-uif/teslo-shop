import type { NextAuthConfig } from "next-auth";
import NextAuth from "next-auth";
import credentials from "next-auth/providers/credentials";
import { z } from "zod";
import prisma from "./lib/prisma";
import bcryptjs from "bcryptjs";

export const authConfig: NextAuthConfig = {
  pages: {
    signIn: "/auth/login",
    newUser: "/auth/new-account",
  },

  callbacks: {
    authorized({ auth, request: { nextUrl } }) {
      const isLoggedIn = !!auth?.user;
      const isOnDashboard = nextUrl.pathname.startsWith("/dashboard");

      if (isOnDashboard) {
        if (isLoggedIn) return true;
        return false; // Redirect unauthenticated users to login page
      } else if (isLoggedIn) {
        return Response.redirect(new URL("/", nextUrl));
      }
      return true;
    },

    jwt({ token, user }) {
      if (user) {
        token.data = user;
      }
      return token;
    },
    session({ session, token, user }) {

      session.user = token.data as any;
      return session;
    },
  },
  // nos permitira colocar google signin etc
  providers: [
    credentials({
      async authorize(credentials) {
        const parsedCredentials = z
          .object({ email: z.string().email(), password: z.string().min(6) })
          .safeParse(credentials);
        if (!parsedCredentials.success) return null;
        // buscar correo
        // comparar contrasenias
        // si regresamos null es un NO pasa
        // Si todo sale BIEN tenemos que regresar al USUARIO
        const { email, password } = parsedCredentials.data;
        const user = await prisma.user.findUnique({
          where: { email: email.toLocaleLowerCase() },
        });
        if (!user) return null;

        if (!bcryptjs.compareSync(password, user.password)) return null;
        // Quitando el password del usuario
        const { password: _, ...restUser } = user;

        return restUser;
      },
    }),
  ],
};
// auth middleware
// signIn para ingresar
// signOut para salir

// exportar el handlers
export const { signIn, signOut, auth, handlers } = NextAuth(authConfig);
