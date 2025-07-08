export default function Fallback() {
  return (
    <div className="flex flex-col items-center justify-center h-max">
      <div className="flex items-center space-x-4 mb-4">
        <div className="h-6 w-24 bg-gray-200 animate-pulse rounded" />
        <div className="ml-4 h-6 w-24 bg-gray-200 animate-pulse rounded" />
        <div className="ml-4 h-6 w-24 bg-gray-200 animate-pulse rounded" />
        <div className="ml-4 h-6 w-24 bg-gray-200 animate-pulse rounded" />
      </div>
      <div className="flex flex-col items-center space-y-2">
        <h1 className="text-2xl font-bold text-gray-800">Loading...</h1>
      </div>
    </div>
  )
}