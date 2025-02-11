export const UserProfileSkeleton = () => (
  <div className="container mx-auto px-4 py-8 max-w-4xl animate-pulse">
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="h-8 bg-gray-200 rounded w-1/4 mb-6"></div>
      <div className="flex flex-col md:flex-row gap-8 items-start">
        <div className="w-full md:w-1/3">
          <div className="w-48 h-48 bg-gray-200 rounded-lg mx-auto mb-4"></div>
        </div>
        <div className="w-full md:w-2/3 space-y-8">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="space-y-2">
              <div className="h-4 bg-gray-200 rounded w-1/6"></div>
              <div className="h-12 bg-gray-200 rounded"></div>
            </div>
          ))}
          <div className="h-12 bg-blue-600 rounded-md w-32 ml-auto"></div>
        </div>
      </div>
    </div>
  </div>
);
