"use client";

import React, { useEffect, useState } from "react";
import PostCard from "../../components/PostCard";
import NewsletterForm from "../../components/NewsletterForm";
import { PaginationResponse, Post, PostCategory, PostFilters } from "../../typings/api";
import { getPosts } from "../../services/postService";
import CardSkeleton from "../../components/Skeletons/CardSkeleton";
import { getPostCategories } from "../../services/postCategoryService";
import EmptyList from "../../components/EmptyList";
import toast from "react-hot-toast";

export default function PostsHome() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [categories, setCategories] = useState<PostCategory[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const [tempSearch, setTempSearch] = useState("");
  const [filters, setFilters] = useState<PostFilters>({});

  const fetchPosts = async (page: number, search: string, filters: PostFilters) => {
    try {
      const response: PaginationResponse<Post> = await getPosts({
        filters: { ...filters, search },
        pagination: { page, per_page: 10 },
      });
      setPosts(response.data);
      setTotalPages(response.last_page);
    } catch (err) {
      toast.error("Falha ao carregar os posts. Por favor, atualize a página.", {
        position: "bottom-left",
      });
      throw err;
    }
  };

  const fetchCategories = async () => {
    try {
      const response: PaginationResponse<PostCategory> = await getPostCategories({
        pagination: { page: 1, per_page: 100 },
      });
      setCategories(response.data);
    } catch {
      toast.error("Falha ao carregar as categorias. Por favor, atualize a página.", {
        position: "bottom-left",
      });
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  useEffect(() => {
    const loadPosts = async () => {
      setIsLoaded(false);
      try {
        await fetchPosts(currentPage, searchQuery, filters);
        setIsLoaded(true);
      } catch {
        setIsLoaded(false);
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
        <h1 className="text-3xl font-bold mb-8 text-left text-gray-800">Pesquise nossos posts</h1>
        <form onSubmit={handleSubmit} className="mb-6">
          <input
            type="text"
            placeholder="Pesquisar posts..."
            value={tempSearch}
            onChange={(e) => setTempSearch(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </form>
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
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 h-full">
          {!isLoaded
            ? Array.from({ length: 10 }).map((_, index) => <CardSkeleton key={`skeleton-${index}`} />)
            : posts.length > 0
              ? posts.map((post) => <PostCard key={post.id} post={post} />)
              : (
                <div className="col-span-full h-full flex items-center justify-center">
                  <EmptyList message="Nenhum post encontrado." />
                </div>
              )}
        </div>
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
                className={`px-4 py-2 border ${currentPage === index + 1
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
