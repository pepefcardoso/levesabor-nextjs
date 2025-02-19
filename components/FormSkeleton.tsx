export const FormSkeleton = () => (
  <div className="container mx-auto px-4 py-8 max-w-4xl animate-pulse">
    <div className="h-10 bg-gray-300 rounded w-1/3 mb-8"></div>
    <div className="space-y-8">
      {[...Array(9)].map((_, i) => (
        <div key={i}>
          <div className="h-5 bg-gray-300 rounded w-1/4 mb-2"></div>
          <div className="h-12 bg-gray-200 rounded"></div>
        </div>
      ))}
      <div className="h-32 bg-gray-200 rounded"></div>
      <div className="h-12 bg-gray-300 rounded w-32"></div>
    </div>
  </div>
);
