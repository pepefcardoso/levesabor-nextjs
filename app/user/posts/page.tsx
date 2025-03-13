"use client";

import FilledButton from "@/components/Buttons/FilledButton";
import ContentCard from "@/components/Cards/ContentCard";
import EmptyList from "@/components/Others/EmptyList";
import Paginator from "@/components/Others/Paginator";
import CardSkeleton from "@/components/Skeletons/CardSkeleton";
import { Typography } from "@/constants/typography";
import { deletePost, getMyPosts } from "@/services/postService";
import { FilledButtonHovers } from "@/typings/buttons";
import { PaginationResponse } from "@/typings/pagination";
import { Post } from "@/typings/post";
import clsx from "clsx";
import { useCallback, useEffect, useState } from "react";
import toast from "react-hot-toast";
import routes from "routes/routes";
import useAuthStore from "store/authStore";

export default function UserPosts() {
  const { user } = useAuthStore();
  const [posts, setPosts] = useState<Post[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const fetchUserPosts = useCallback(async () => {
    setIsLoaded(false);
    try {
      if (!user) throw new Error("User not authenticated");

      const response: PaginationResponse<Post> = await getMyPosts({
        pagination: { page: currentPage, per_page: 10 },
      });

      setPosts(response.data);
      setTotalPages(response.last_page);
      setIsLoaded(true);
    } catch {
      toast.error("Por favor, recarregue a página");
      setIsLoaded(false);
    }
  }, [user, currentPage]);

  useEffect(() => {
    fetchUserPosts();
  }, [fetchUserPosts]);

  const handleDelete = async (postId: string) => {
    if (!confirm("Tem certeza que deseja deletar este post?")) return;
    try {
      await deletePost(postId);
      if (posts.length === 1 && currentPage > 1) {
        setCurrentPage(currentPage - 1);
      } else {
        fetchUserPosts();
      }
    } catch {
      toast.error("Por favor, recarregue a página");
    }
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-6xl">
      <div className="flex justify-between items-center mb-8">
        <h1 className={clsx(Typography.Title)}>Meus Posts</h1>
        <FilledButton
          text="Adicionar Novo Post"
          href={routes.user.posts.create}
          hoverAnimation={FilledButtonHovers.opacity}
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
