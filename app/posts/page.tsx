"use client";

import React, { useEffect, useState } from "react";
import PostCard from "../../components/PostCard";
import NewsletterForm from "../../components/NewsletterForm";
import { PaginationResponse, Post, PostFilters } from "../../typings/api";
import { getPosts } from "../../services/postService";
import CardSkeleton from "../../components/CardSkeleton";

export default function PostsHome() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const [filters, setFilters] = useState<PostFilters>({});

  const fetchPosts = async (page: number, search: string, filters: PostFilters) => {
    try {
      const response: PaginationResponse<Post> = await getPosts({
        filters: {
          ...filters,
          title: search, // Add search query to filters
        },
        pagination: {
          page,
          perPage: 10, // Show 10 items per page
        },
      });
      setPosts(response.data);
      setTotalPages(response.last_page);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    setLoading(true);
    fetchPosts(currentPage, searchQuery, filters);
  }, [currentPage, searchQuery, filters]);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
    setCurrentPage(1); // Reset to the first page when searching
  };

  const handleFilterChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFilters((prevFilters) => ({
      ...prevFilters,
      [name]: value,
    }));
    setCurrentPage(1); // Reset to the first page when applying filters
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-5xl w-full">
      <div className="px-4">
        {/* Search Bar */}
        <div className="mb-6">
          <input
            type="text"
            placeholder="Search posts..."
            value={searchQuery}
            onChange={handleSearch}
            className="w-full p-2 border border-gray-300 rounded-md"
          />
        </div>

        {/* Filters */}
        <div className="mb-6 flex gap-4">
          <select
            name="category_id"
            onChange={handleFilterChange}
            className="p-2 border border-gray-300 rounded-md"
          >
            <option value="">All Categories</option>
            {/* Populate with actual categories */}
            <option value="1">Category 1</option>
            <option value="2">Category 2</option>
          </select>
          <select
            name="topics"
            onChange={handleFilterChange}
            className="p-2 border border-gray-300 rounded-md"
          >
            <option value="">All Topics</option>
            {/* Populate with actual topics */}
            <option value="1">Topic 1</option>
            <option value="2">Topic 2</option>
          </select>
        </div>

        {/* Error Message */}
        {error && <div className="text-red-500 mb-4">{error}</div>}

        {/* Posts Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {loading
            ? [1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((skeletonId) => (
                <CardSkeleton key={skeletonId} />
              ))
            : posts.map((post) => <PostCard key={post.id} post={post} />)}
        </div>

        {/* Pagination */}
        <div className="flex justify-center mt-8">
          {Array.from({ length: totalPages }, (_, index) => (
            <button
              key={index + 1}
              onClick={() => handlePageChange(index + 1)}
              className={`mx-1 px-3 py-1 border ${
                currentPage === index + 1
                  ? "bg-blue-500 text-white"
                  : "bg-white text-gray-700"
              } rounded-md`}
            >
              {index + 1}
            </button>
          ))}
        </div>
      </div>

      <NewsletterForm />
    </div>
  );
}