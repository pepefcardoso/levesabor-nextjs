export const UserProfileSkeleton = () => {
  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl animate-pulse">
      <div className="bg-white rounded-lg shadow-md p-6 relative">
        <div className="h-8 w-8 bg-gray-200 rounded-full absolute top-6 right-6" />
        
        <div className="h-10 bg-gray-200 w-1/3 mb-8 rounded" />
        
        <div className="flex flex-col md:flex-row gap-8 items-start">
          <div className="w-full md:w-2/3 space-y-8">
            <div className="w-full md:w-1/3">
              <div className="w-48 h-48 bg-gray-200 rounded-lg mx-auto mb-6" />
              <div className="h-12 bg-gray-200 rounded-md" />
            </div>
            
            <div className="space-y-6">
              {[...Array(4)].map((_, i) => (
                <div key={i}>
                  <div className="h-6 bg-gray-200 w-1/4 mb-2 rounded" />
                  <div className="h-12 bg-gray-200 rounded-md" />
                </div>
              ))}
            </div>
            
            <div className="h-12 bg-gray-200 w-32 rounded-md ml-auto" />
          </div>
        </div>
      </div>
    </div>
  );
};