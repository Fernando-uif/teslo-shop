// https://tailwindcomponents.com/component/hoverable-table
export const revalidate = 0;

import { redirect } from "next/navigation";

import { getPaginatedUsers } from "@/actions";
import { Title } from "@/components";
import { UserTable } from "./ui/UserTable";

export default async function OrdersPage() {
  const { ok, users = [] } = await getPaginatedUsers();
  if (!ok) {
    // redirect("/auth/login");
    redirect("/");
  }
  return (
    <>
      <Title title="Manage Users" />

      <div className="mb-10">
        <UserTable users={users} />
      </div>
    </>
  );
}
