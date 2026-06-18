import { ArrowDownRight, ArrowUpRight } from "lucide-react";

type KpiCardProps = {
  title: string;
  value: string;
  change: string;
  trend: "up" | "down";
};

export default function KpiCard({
  title,
  value,
  change,
  trend,
}: KpiCardProps) {
  const isUp = trend === "up";

  return (
    <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
      <div className="flex items-center justify-between">
        <p className="text-sm font-medium text-gray-500">{title}</p>

        <div
          className={`flex items-center rounded-full px-2 py-1 text-xs font-medium ${
            isUp
              ? "bg-green-50 text-green-700"
              : "bg-red-50 text-red-700"
          }`}
        >
          {isUp ? (
            <ArrowUpRight className="mr-1 h-3 w-3" />
          ) : (
            <ArrowDownRight className="mr-1 h-3 w-3" />
          )}
          {change}
        </div>
      </div>

      <p className="mt-4 text-2xl font-bold text-gray-900">{value}</p>
    </div>
  );
}