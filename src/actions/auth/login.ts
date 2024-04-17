"use server";
// autenticacion que exportamos
import { signIn } from "@/auth.config";
import { AuthError } from "next-auth";

export async function authenticate(
  prevState: string | undefined,
  formData: FormData
) {
  try {
    // credentials seria google, github etc
    console.log(Object.fromEntries(formData), "resp");
    await signIn("credentials", {
      ...Object.fromEntries(formData),
      redirect: false,
    });
    return "Success";
  } catch (error) {
    if (error instanceof AuthError) {
      if ((error as any).type === "Invalid credentials.") {
        return "Invalid credentials.";
      }
      return "Unknown Error";
    }
  }
}
