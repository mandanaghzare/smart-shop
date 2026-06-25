"use client";

import Link from "next/link";
import Image from "next/image";
import { users } from "@/data/users";
import { useOrderStore } from "@/store/orderStore";

export default function UsersPage() {
  const orders = useOrderStore((state) => state.orders);

  return (
    <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
      <div className="mb-6">
        <p className="text-sm text-gray-500">Users Management</p>

        <h1 className="mt-1 text-3xl font-bold text-gray-900">
          Users
        </h1>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full min-w-[900px]">
          <thead>
            <tr className="border-b border-gray-200 text-left text-sm text-gray-500">
              <th className="pb-3 font-medium">User</th>
              <th className="pb-3 font-medium">Email</th>
              <th className="pb-3 font-medium">Orders</th>
              <th className="pb-3 font-medium">Total Spent</th>
              <th className="pb-3 font-medium">Actions</th>
            </tr>
          </thead>

          <tbody>
            {users.map((user) => {
              const userOrders = orders.filter(
                (order) => order.userId === user.id
              );

              const totalSpent = userOrders.reduce(
                (sum, order) => sum + order.total,
                0
              );

              return (
                <tr
                  key={user.id}
                  className="border-b border-gray-100 text-sm hover:bg-gray-50"
                >
                  <td className="py-4">
                    <div className="flex items-center gap-3">
                      <Image
                        src={user.image}
                        alt={user.firstName}
                        width={40}
                        height={40}
                        className="rounded-full"
                      />

                      <div>
                        <p className="font-medium text-gray-900">
                          {user.firstName} {user.lastName}
                        </p>

                        <p className="text-xs text-gray-500">
                          ID: {user.id}
                        </p>
                      </div>
                    </div>
                  </td>

                  <td className="py-4 text-gray-600">
                    {user.email}
                  </td>

                  <td className="py-4 font-medium text-gray-900">
                    {userOrders.length}
                  </td>

                  <td className="py-4 font-medium text-gray-900">
                    ${totalSpent.toFixed(2)}
                  </td>

                  <td className="py-4">
                    <Link
                      href={`/admin/users/${user.id}`}
                      className="text-sm font-medium text-blue-600 hover:text-blue-700"
                    >
                      View
                    </Link>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}