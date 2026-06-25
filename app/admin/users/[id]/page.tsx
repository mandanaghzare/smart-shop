"use client";

import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
import { users } from "@/data/users";
import { useOrderStore } from "@/store/orderStore";

export default function UserDetailsPage() {
  const params = useParams<{ id: string }>();
  const orders = useOrderStore((state) => state.orders);

  const user = users.find((user) => String(user.id) === params.id);

  if (!user) {
    return <div>User not found</div>;
  }

  const userOrders = orders.filter((order) => order.userId === user.id);

  const totalSpent = userOrders.reduce(
    (sum, order) => sum + order.total,
    0
  );

  return (
    <div className="space-y-6">
      <div className="flex items-start justify-between gap-4">
        <div className="flex items-center gap-4">
          <Image
            src={user.image}
            alt={`${user.firstName} ${user.lastName}`}
            width={72}
            height={72}
            className="rounded-full border border-gray-200 bg-white"
          />

          <div>
            <p className="text-sm text-gray-500">User Details</p>
            <h1 className="mt-1 text-3xl font-bold text-gray-900">
              {user.firstName} {user.lastName}
            </h1>
            <p className="mt-1 text-sm text-gray-500">{user.email}</p>
          </div>
        </div>

        <Link
          href="/admin/users"
          className="rounded-lg border border-gray-200 bg-white px-4 py-2 text-sm font-medium text-gray-700 transition hover:bg-gray-50"
        >
          Back to Users
        </Link>
      </div>

      <div className="grid gap-4 md:grid-cols-4">
        <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
          <p className="text-xs uppercase tracking-wider text-gray-500">
            Orders
          </p>
          <p className="mt-2 text-xl font-bold text-gray-900">
            {userOrders.length}
          </p>
        </div>

        <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
          <p className="text-xs uppercase tracking-wider text-gray-500">
            Total Spent
          </p>
          <p className="mt-2 text-xl font-bold text-gray-900">
            ${totalSpent.toFixed(2)}
          </p>
        </div>

        <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
          <p className="text-xs uppercase tracking-wider text-gray-500">
            Age
          </p>
          <p className="mt-2 text-xl font-bold text-gray-900">
            {user.age}
          </p>
        </div>

        <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
          <p className="text-xs uppercase tracking-wider text-gray-500">
            Gender
          </p>
          <p className="mt-2 text-xl font-bold capitalize text-gray-900">
            {user.gender}
          </p>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
          <h2 className="text-lg font-semibold text-gray-900">
            Personal Info
          </h2>

          <div className="mt-4 space-y-3 text-sm">
            <p>
              <span className="text-gray-500">Username:</span>{" "}
              <span className="font-medium text-gray-900">{user.username}</span>
            </p>

            <p>
              <span className="text-gray-500">Phone:</span>{" "}
              <span className="font-medium text-gray-900">{user.phone}</span>
            </p>

            <p>
              <span className="text-gray-500">Email:</span>{" "}
              <span className="font-medium text-gray-900">{user.email}</span>
            </p>
          </div>
        </div>

        <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
          <h2 className="text-lg font-semibold text-gray-900">Address</h2>

          <div className="mt-4 space-y-3 text-sm">
            <p className="font-medium text-gray-900">{user.address.address}</p>
            <p className="text-gray-600">
              {user.address.city}, {user.address.state}
            </p>
            <p className="text-gray-600">{user.address.postalCode}</p>
          </div>
        </div>

        <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
          <h2 className="text-lg font-semibold text-gray-900">Company</h2>

          <div className="mt-4 space-y-3 text-sm">
            <p className="font-medium text-gray-900">{user.company.name}</p>
            <p className="text-gray-600">{user.company.title}</p>
          </div>
        </div>
      </div>

      <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
        <h2 className="text-lg font-semibold text-gray-900">Recent Orders</h2>

        <div className="mt-5 overflow-x-auto">
          {userOrders.length > 0 ? (
            <table className="w-full min-w-[650px]">
              <thead>
                <tr className="border-b border-gray-200 text-left text-sm text-gray-500">
                  <th className="pb-3 font-medium">Order ID</th>
                  <th className="pb-3 font-medium">Date</th>
                  <th className="pb-3 font-medium">Status</th>
                  <th className="pb-3 font-medium">Total</th>
                  <th className="pb-3 font-medium">Actions</th>
                </tr>
              </thead>

              <tbody>
                {userOrders.map((order) => (
                  <tr
                    key={order.id}
                    className="border-b border-gray-100 text-sm"
                  >
                    <td className="py-4 font-medium text-gray-900">
                      #{order.id.slice(0, 8)}
                    </td>

                    <td className="py-4 text-gray-600">
                      {order.createdAt}
                    </td>

                    <td className="py-4">
                      <span
                        className={`rounded-full px-3 py-1 text-xs font-medium ${
                          order.status === "delivered"
                            ? "bg-green-100 text-green-700"
                            : order.status === "processing"
                            ? "bg-yellow-100 text-yellow-700"
                            : "bg-red-100 text-red-700"
                        }`}
                      >
                        {order.status}
                      </span>
                    </td>

                    <td className="py-4 font-medium text-gray-900">
                      ${order.total.toFixed(2)}
                    </td>

                    <td className="py-4">
                      <Link
                        href={`/admin/orders/${order.id}`}
                        className="text-sm font-medium text-blue-600 hover:text-blue-700"
                      >
                        View
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <div className="py-8 text-center">
              <p className="font-medium text-gray-900">No orders yet</p>
              <p className="mt-1 text-sm text-gray-500">
                This user has not placed any orders.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}