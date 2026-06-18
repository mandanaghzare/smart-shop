export default function Header() {
  return (
    <header className="flex h-16 items-center justify-between border-b border-gray-200 bg-white px-6">
      <h2 className="text-lg font-semibold text-gray-900">
        Dashboard
      </h2>

      <div className="flex items-center gap-3">
        <div className="h-9 w-9 rounded-full bg-gray-200" />
      </div>
    </header>
  );
}