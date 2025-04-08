"use client";

import FilledButton from "@/components/Buttons/FilledButton";
import ContentCard from "@/components/Cards/ContentCard";
import EmptyList from "@/components/Others/EmptyList";
import Paginator from "@/components/Others/Paginator";
import CardSkeleton from "@/components/Skeletons/CardSkeleton";
import { Typography } from "@/constants/typography";
import { PaginationResponse } from "@/typings/pagination";
import { Post } from "@/typings/post";
import clsx from "clsx";
import { useCallback, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { FaExclamationTriangle } from "react-icons/fa";
import routes from "../../../../routes/routes";
import { postService } from "@/services/index";
import useUserStore from "@/store/userStore";

export default function UserPosts() {
  const { user } = useUserStore();
  const [posts, setPosts] = useState<Post[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [hasError, setHasError] = useState(false);

  const fetchUserPosts = useCallback(async () => {
    setIsLoaded(false);
    setHasError(false);
    try {
      if (!user) throw new Error("User not authenticated");

      const response: PaginationResponse<Post> = await postService.getCurrentUserPosts({
        page: currentPage, per_page: 10
      });

      setPosts(response.data);
      setTotalPages(response.last_page);
      setIsLoaded(true);
    } catch {
      toast.error("Por favor, tente novamente", { id: "error-message" });
      setHasError(true);
      setIsLoaded(true);
    }
  }, [user, currentPage]);

  useEffect(() => {
    fetchUserPosts();
  }, [fetchUserPosts]);

  const handleDelete = async (postId: string) => {
    if (!confirm("Tem certeza que deseja deletar este post?")) return;
    try {
      await postService.delete(postId);
      if (posts.length === 1 && currentPage > 1) {
        setCurrentPage(currentPage - 1);
      } else {
        fetchUserPosts();
      }
    } catch {
      toast.error("Por favor, tente novamente", { id: "error-message" });
    }
  };

  if (hasError) {
    return (
      <div className="min-h-screen mx-auto flex items-center justify-center">
        <EmptyList
          title="Por favor, tente novamente"
          description="Ocorreu um erro ao carregar seus posts"
          Icon={FaExclamationTriangle}
        />
      </div>
    );
  }

  return (
    <div className="container mx-auto p-8 max-w-6xl">
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-8">
        <h1 className={clsx(Typography.Headline, "mb-4 md:mb-0")}>Meus Posts</h1>
        <FilledButton
          text="Adicionar Novo Post"
          href={routes.user.posts.create}
        />
      </div>

      {!isLoaded ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {Array.from({ length: 6 }).map((_, index) => (
            <CardSkeleton key={index} />
          ))}
        </div>
      ) : posts.length === 0 ? (
        <EmptyList title="Você ainda não criou nenhum post." />
      ) : (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {posts.map((post) => (
              <ContentCard
                key={post.id}
                detailRoute={(id) => routes.posts.details(id)}
                editRoute={(id) => routes.user.posts.update(id)}
                handleDelete={handleDelete}
                item={post}
              />
            ))}
          </div>
          <Paginator
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={setCurrentPage}
            className="mt-10"
          />
        </>
      )}
    </div>
  );
}
