"use client";

import React, { useEffect, useState } from "react";
import PostCard from "../../components/PostCard";
import NewsletterForm from "../../components/NewsletterForm";
import {
  PaginationResponse,
  Post,
  PostCategory,
  PostFilters,
} from "../../typings/api";
import { getPosts } from "../../services/postService";
import CardSkeleton from "../../components/CardSkeleton";
import { getPostCategories } from "../../services/postCategoryService";

export default function PostsHome() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [categories, setCategories] = useState<PostCategory[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const [tempSearch, setTempSearch] = useState("");
  const [filters, setFilters] = useState<PostFilters>({});

  const fetchPosts = async (
    page: number,
    search: string,
    filters: PostFilters
  ) => {
    try {
      const response: PaginationResponse<Post> = await getPosts({
        filters: {
          ...filters,
          title: search,
        },
        pagination: {
          page,
          perPage: 10,
        },
      });
      setPosts(response.data);
      setTotalPages(response.last_page);
    } catch (err: any) {
      setError(err.message);
    }
  };

  const fetchCategories = async () => {
    try {
      const response: PaginationResponse<PostCategory> =
        await getPostCategories({
          pagination: {
            page: 1,
            perPage: 100,
          },
        });
      setCategories(response.data);
    } catch (err: any) {
      setError(err.message);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  useEffect(() => {
    const loadPosts = async () => {
      setLoading(true);
      try {
        await fetchPosts(currentPage, searchQuery, filters);
      } finally {
        setLoading(false);
      }
    };
    loadPosts();
  }, [currentPage, searchQuery, filters]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSearchQuery(tempSearch);
    setCurrentPage(1);
  };

  const handleFilterChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFilters((prev) => ({ ...prev, [name]: value }));
    setCurrentPage(1);
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-6xl w-full">
      <div className="px-4">
        <h1 className="text-3xl font-bold mb-8 text-center text-gray-800">
          Pesquise nossos posts
        </h1>

        {/* Search Bar */}
        <form onSubmit={handleSubmit} className="mb-6">
          <input
            type="text"
            placeholder="Pesquisar posts..."
            value={tempSearch}
            onChange={(e) => setTempSearch(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </form>

        {/* Filters */}
        <div className="mb-6 flex gap-4">
          <select
            name="category_id"
            onChange={handleFilterChange}
            className="p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="">Todas as categorias</option>
            {categories.map((category) => (
              <option key={category.id} value={category.id}>
                {category.name}
              </option>
            ))}
          </select>
        </div>

        {/* Error Message */}
        {error && <div className="text-red-500 mb-4 text-center">{error}</div>}

        {/* Posts Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {loading
            ? Array.from({ length: 10 }).map((_, index) => (
                <CardSkeleton key={`skeleton-${index}`} />
              ))
            : posts.map((post) => <PostCard key={post.id} post={post} />)}
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex justify-center mt-8 flex-wrap gap-2">
            <button
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
              className="px-4 py-2 border border-gray-300 bg-white text-gray-700 rounded-md hover:bg-gray-50 disabled:opacity-50"
            >
              Anterior
            </button>
            {Array.from({ length: totalPages }, (_, index) => (
              <button
                key={index + 1}
                onClick={() => handlePageChange(index + 1)}
                className={`px-4 py-2 border ${
                  currentPage === index + 1
                    ? "bg-blue-500 text-white border-blue-500"
                    : "bg-white text-gray-700 border-gray-300 hover:bg-gray-50"
                } rounded-md transition-colors`}
              >
                {index + 1}
              </button>
            ))}
            <button
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
              className="px-4 py-2 border border-gray-300 bg-white text-gray-700 rounded-md hover:bg-gray-50 disabled:opacity-50"
            >
              Próximo
            </button>
          </div>
        )}
      </div>

      <NewsletterForm />
    </div>
  );
}
