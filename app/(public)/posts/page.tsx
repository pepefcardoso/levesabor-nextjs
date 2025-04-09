"use client";

import PostCard from "@/components/Cards/PostCard";
import NewsletterForm from "@/components/Forms/NewsletterForm";
import CustomInputSelect from "@/components/Inputs/CustomSelectInput";
import CustomTextInput from "@/components/Inputs/CustomTextInput";
import Paginator from "@/components/Others/Paginator";
import EmptyList from "@/components/Others/EmptyList";
import CardSkeleton from "@/components/Skeletons/CardSkeleton";
import { Typography } from "@/constants/typography";
import { PaginationResponse } from "@/typings/pagination";
import { Post, PostCategory, PostFilters } from "@/typings/post";
import clsx from "clsx";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { FaExclamationTriangle } from "react-icons/fa";
import { postCategoryService, postService } from "@/services/index";

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
      const response: PaginationResponse<Post> = await postService.getAll(
        { page, per_page: 10 },
        { ...filters, search },
      );
      setPosts(response.data);
      setTotalPages(response.last_page);
    } catch (err) {
      toast.error("Por favor, atualize a página.", { id: "error-message" });
      throw err;
    }
  };

  const fetchCategories = async () => {
    try {
      const response: PaginationResponse<PostCategory> = await postCategoryService.getAll({
        page: 1, per_page: 100,
      });
      setCategories(response.data);
    } catch {
      toast.error("Por favor, atualize a página.", { id: "error-message" });
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
    <div className="mx-auto px-4 py-8 max-w-7xl w-full space-y-8">
      <div className="px-4">
        <h1 className={clsx(Typography.Headline, "mb-4 sm:mb-6 text-left")}>Pesquise nossos posts</h1>
        <form onSubmit={handleSubmit} className="mb-6">
          <CustomTextInput
            placeholder="Pesquisar posts..."
            value={tempSearch}
            onChange={(e) => setTempSearch(e.target.value)}
          />
        </form>
        <div className="mb-6 flex gap-4">
          <CustomInputSelect
            name="category_id"
            options={categories.map((category) => ({
              value: category.id,
              label: category.name,
            }))}
            placeholder="Todas as categorias"
            onChange={handleFilterChange}
            className="min-w-[220px]"
          />
        </div>
        <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 h-full">
          {!isLoaded ? (
            Array.from({ length: 10 }).map((_, index) => <CardSkeleton key={`skeleton-${index}`} />)
          ) : posts.length > 0 ? (
            posts.map((post) => <PostCard key={post.id} post={post} />)
          ) : (
            <div className="col-span-full flex justify-center">
              <EmptyList title="Nenhum post foi encontrado" description="Tente outra busca" Icon={FaExclamationTriangle} />
            </div>
          )}
        </div>

        <Paginator
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
          className="mt-12"
        />
      </div>
      <NewsletterForm />
    </div>
  );
}
