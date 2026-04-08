export default function SkeletonCard() {
  return (
    <div className="bg-white rounded-2xl p-5 shadow-sm animate-pulse space-y-3">
      <div className="h-4 bg-gray-200 rounded w-3/4" />
      <div className="h-3 bg-gray-200 rounded w-1/2" />
      <div className="h-3 bg-gray-200 rounded w-2/3" />
    </div>
  )
}
