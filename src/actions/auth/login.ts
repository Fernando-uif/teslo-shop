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

export const login = async (email: string, password: string) => {
  try {
    await signIn("credentials", { email, password });
    console.log('se autentico bien');
    return {
      ok: true,
    };
  } catch (error) {
    console.log('se autentico mal');
    console.log(error);
    return {
      ok: false,
      message: "Error Login",
    };
  }
};
