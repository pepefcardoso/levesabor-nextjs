// components/LoadingSkeleton.tsx
import React from "react";

const PageLoadingSkeleton = () => {
  return (
    <div className="container mx-auto px-6 py-8 max-w-4xl animate-pulse">
      {/* Category Tag Skeleton */}
      <div className="h-6 w-24 bg-gray-300 rounded mb-4"></div>

      {/* Title Skeleton */}
      <div className="h-8 bg-gray-300 rounded w-3/4 mb-4"></div>

      {/* Author Section Skeleton */}
      <div className="flex items-center space-x-4 mb-6">
        <div className="w-10 h-10 bg-gray-300 rounded-full"></div>
        <div className="h-4 bg-gray-300 rounded w-32"></div>
      </div>

      {/* Image Skeleton */}
      <div className="h-64 bg-gray-300 rounded-lg mb-6"></div>

      {/* Tags Skeleton */}
      <div className="flex gap-4 mb-6">
        <div className="h-6 bg-gray-300 rounded flex-1"></div>
        <div className="h-6 bg-gray-300 rounded flex-1"></div>
        <div className="h-6 bg-gray-300 rounded flex-1"></div>
      </div>

      {/* Description Skeleton */}
      <div className="space-y-2 mb-8">
        <div className="h-4 bg-gray-300 rounded w-full"></div>
        <div className="h-4 bg-gray-300 rounded w-5/6"></div>
        <div className="h-4 bg-gray-300 rounded w-4/6"></div>
      </div>

      {/* Ingredients Skeleton */}
      <div className="mb-8">
        <div className="h-6 bg-gray-300 rounded w-32 mb-4"></div>
        <div className="space-y-2">
          <div className="h-4 bg-gray-300 rounded w-full"></div>
          <div className="h-4 bg-gray-300 rounded w-5/6"></div>
          <div className="h-4 bg-gray-300 rounded w-4/6"></div>
        </div>
      </div>

      {/* Steps Skeleton */}
      <div className="mb-8">
        <div className="h-6 bg-gray-300 rounded w-32 mb-4"></div>
        <div className="space-y-4">
          <div className="h-4 bg-gray-300 rounded w-full"></div>
          <div className="h-4 bg-gray-300 rounded w-5/6"></div>
          <div className="h-4 bg-gray-300 rounded w-4/6"></div>
        </div>
      </div>

      {/* Diet Tags Skeleton */}
      <div className="mb-8">
        <div className="h-6 bg-gray-300 rounded w-32 mb-4"></div>
        <div className="flex gap-3">
          <div className="h-6 bg-gray-300 rounded w-24"></div>
          <div className="h-6 bg-gray-300 rounded w-24"></div>
        </div>
      </div>
    </div>
  );
};

export default PageLoadingSkeleton;
