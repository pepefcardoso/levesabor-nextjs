"use client";

import PostCard from "@/components/Cards/PostCard";
import NewsletterForm from "@/components/Forms/NewsletterForm";
import CustomInputSelect from "@/components/Inputs/CustomSelectInput";
import CustomTextInput from "@/components/Inputs/CustomTextInput";
import CustomPaginator from "@/components/Others/CustomPaginator";
import EmptyList from "@/components/Others/EmptyList";
import CardSkeleton from "@/components/Skeletons/CardSkeleton";
import { Typography } from "@/constants/typography";
import { getPostCategories } from "@/services/postCategoryService";
import { getPosts } from "@/services/postService";
import { PaginationResponse } from "@/typings/pagination";
import { Post, PostCategory, PostFilters } from "@/typings/post";
import clsx from "clsx";
import { useEffect, useState } from "react";
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

  const fetchPosts = async (
    page: number,
    search: string,
    filters: PostFilters
  ) => {
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
      const response: PaginationResponse<PostCategory> =
        await getPostCategories({
          pagination: { page: 1, per_page: 100 },
        });
      setCategories(response.data);
    } catch {
      toast.error(
        "Falha ao carregar as categorias. Por favor, atualize a página.",
        {
          position: "bottom-left",
        }
      );
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
    <div className="container mx-auto px-4 py-8 max-w-6xl w-full space-y-8">
      <div className="px-4">
        <h1 className={clsx(Typography.Title, "mb-4 sm:mb-6 text-left")}>
          Pesquise nossos posts
        </h1>
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
        <div className="grid grid-cols-2 md:grid-cols-3 gap-6 h-full">
          {!isLoaded ? (
            Array.from({ length: 10 }).map((_, index) => (
              <CardSkeleton key={`skeleton-${index}`} />
            ))
          ) : posts.length > 0 ? (
            posts.map((post) => <PostCard key={post.id} post={post} />)
          ) : (
            <EmptyList title="Nenhum post foi encontrado" description="Tente outra busca"></EmptyList>
          )}
        </div>

        <CustomPaginator
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
          className="mt-10"
        />
      </div>
      <NewsletterForm />
    </div>
  );
}
