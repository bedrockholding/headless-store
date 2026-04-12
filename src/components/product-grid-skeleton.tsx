export function ProductGridSkeleton() {
  return (
    <ul className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {Array.from({ length: 8 }).map((_, i) => (
        <li
          key={i}
          className="overflow-hidden rounded-xl border border-zinc-200 bg-white"
        >
          <div className="aspect-square animate-pulse bg-zinc-100" />
          <div className="space-y-2 p-4">
            <div className="h-4 w-3/4 animate-pulse rounded bg-zinc-100" />
            <div className="h-4 w-1/4 animate-pulse rounded bg-zinc-100" />
          </div>
        </li>
      ))}
    </ul>
  );
}
