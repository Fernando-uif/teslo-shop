"use client";

import { User } from "@/interfaces";
import React from "react";
import { IoCardOutline } from "react-icons/io5";
import Link from "next/link";
import { changeUserRole } from "@/actions";
interface Props {
  users: User[];
}
export const UserTable = ({ users }: Props) => {
  return (
    <table className="min-w-full">
      <thead className="bg-gray-200 border-b">
        <tr>
          <th
            scope="col"
            className="text-sm font-medium text-gray-900 px-6 py-4 text-left"
          >
            Email
          </th>
          <th
            scope="col"
            className="text-sm font-medium text-gray-900 px-6 py-4 text-left"
          >
            Full Name
          </th>
          <th
            scope="col"
            className="text-sm font-medium text-gray-900 px-6 py-4 text-left"
          >
            Role
          </th>
        </tr>
      </thead>
      <tbody>
        {users.map((user) => {
          return (
            <>
              <tr className="bg-white border-b transition duration-300 ease-in-out hover:bg-gray-100">
                <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                  {user?.email}
                </td>
                <td className="flex items-center text-sm  text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                  {user.name}
                </td>

                <td className="text-sm text-gray-900 font-light px-6 ">
                  <select
                    value={user.role}
                    onChange={(e) => changeUserRole(user.id, e.target.value)}
                    className="text-sm w-full text-gray-900 p-2"
                  >
                    <option value="admin">Admin</option>
                    <option value="user">User</option>
                  </select>
                </td>
              </tr>
            </>
          );
        })}
      </tbody>
    </table>
  );
};
