export function LoginSkeleton() {
  return (
    <div className="max-w-lg w-full p-8 space-y-8 bg-white rounded-lg shadow-lg">
      <div className="text-left">
        <div className="h-8 bg-gray-200 rounded w-3/4 mb-4 animate-pulse" />
        <div className="h-4 bg-gray-200 rounded w-1/2 animate-pulse" />
      </div>
      <div className="space-y-8">
        <div className="space-y-6">
          <div>
            <div className="h-5 bg-gray-200 rounded w-1/4 mb-2 animate-pulse" />
            <div className="h-10 bg-gray-200 rounded animate-pulse" />
          </div>
          <div>
            <div className="h-5 bg-gray-200 rounded w-1/4 mb-2 animate-pulse" />
            <div className="h-10 bg-gray-200 rounded animate-pulse" />
          </div>
          <div className="h-4 bg-gray-200 rounded w-1/3 ml-auto animate-pulse" />
        </div>
        <div className="h-12 bg-gray-200 rounded animate-pulse" />
      </div>
    </div>
  );
}