import type { NextAuthConfig } from "next-auth";
import NextAuth from "next-auth";
import credentials from "next-auth/providers/credentials";
import { z } from "zod";

export const authConfig: NextAuthConfig = {
  pages: {
    signIn: "/auth/login",
    newUser: "/auth/new-account",
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
        return null;
      },
    }),
  ],
};
// auth middleware
// signIn para ingresar
// signOut para salir

export const { signIn, signOut, auth } = NextAuth(authConfig);
