export default function AnalyticsSummary() {
  return (
    <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
      <div className="mb-6">
        <h3 className="text-lg font-semibold text-gray-900">
          Sales Analytics
        </h3>
        <p className="text-sm text-gray-500">
          Channel performance overview
        </p>
      </div>

      <div className="space-y-5">
        <div>
          <div className="mb-2 flex items-center justify-between text-sm">
            <span className="font-medium text-gray-700">Direct</span>
            <span className="text-gray-500">52%</span>
          </div>
          <div className="h-2 rounded-full bg-gray-100">
            <div className="h-2 w-[52%] rounded-full bg-gray-950" />
          </div>
        </div>

        <div>
          <div className="mb-2 flex items-center justify-between text-sm">
            <span className="font-medium text-gray-700">Social</span>
            <span className="text-gray-500">28%</span>
          </div>
          <div className="h-2 rounded-full bg-gray-100">
            <div className="h-2 w-[28%] rounded-full bg-gray-950" />
          </div>
        </div>

        <div>
          <div className="mb-2 flex items-center justify-between text-sm">
            <span className="font-medium text-gray-700">Referral</span>
            <span className="text-gray-500">16%</span>
          </div>
          <div className="h-2 rounded-full bg-gray-100">
            <div className="h-2 w-[16%] rounded-full bg-gray-950" />
          </div>
        </div>
      </div>

      <div className="mt-6 rounded-lg bg-gray-50 p-4">
        <p className="text-sm font-medium text-gray-900">
          Conversion Rate
        </p>
        <p className="mt-2 text-2xl font-bold text-gray-900">
          6.84%
        </p>
        <p className="mt-1 text-sm text-gray-500">
          +1.2% from last month
        </p>
      </div>
    </div>
  );
}