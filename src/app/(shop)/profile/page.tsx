import { auth } from "@/auth.config";
import { Title } from "@/components";
import { redirect } from "next/navigation";
import React from "react";

export default async function ProfileaPage(){
  const session = await auth();

  if (!session?.user) {
    redirect("/");
  }

  return (
    <>
      <Title title="Profile" />
      {JSON.stringify(session.user, null, 2)}
    </>
  );
};
