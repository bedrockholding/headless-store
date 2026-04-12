export default function ProductLoading() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6">
      <div className="mb-8 h-4 w-32 animate-pulse rounded bg-zinc-200" />
      <div className="grid gap-10 lg:grid-cols-2">
        <div className="aspect-square animate-pulse rounded-xl bg-zinc-200" />
        <div className="space-y-4">
          <div className="h-10 w-3/4 animate-pulse rounded bg-zinc-200" />
          <div className="h-32 animate-pulse rounded bg-zinc-200" />
        </div>
      </div>
    </div>
  );
}
