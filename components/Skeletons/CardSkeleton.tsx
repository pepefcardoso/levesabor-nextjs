const CardSkeleton = () => {
  return (
    <div className="animate-pulse rounded-lg overflow-hidden shadow-lg bg-white flex flex-col h-[400px]">
      <div className="bg-gray-300 h-48 w-full"></div>

      <div className="p-4 flex flex-col flex-grow space-y-2">
        <div className="bg-gray-300 h-6 w-3/4"></div>
        <div className="bg-gray-300 h-4 w-full"></div>
        <div className="bg-gray-300 h-4 w-full"></div>
        <div className="bg-gray-300 h-4 w-5/6"></div>
      </div>
    </div>
  );
};

export default CardSkeleton;
