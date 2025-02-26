"use client";

import React, { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import toast from "react-hot-toast";
import useAuthStore from "../../../store/authStore";
import { PaginationResponse, Post } from "../../../typings/api";
import { deletePost, getMyPosts } from "../../../services/postService";
import CardSkeleton from "../../../components/CardSkeleton";
import EmptyList from "../../../components/EmptyList";
import UserPostListCard from "../../../components/Cards/UserPostListCard";

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
      toast.error("Por favor, recarregue a página", { position: "bottom-left" });
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
      toast.error("Por favor, recarregue a página", { position: "bottom-left" });
    }
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-7xl">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Meus Posts</h1>
        <Link
          href="/user/posts/add"
          className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
        >
          Adicionar Novo Post
        </Link>
      </div>

      {!isLoaded ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {Array.from({ length: 6 }).map((_, index) => (
            <CardSkeleton key={index} />
          ))}
        </div>
      ) : posts.length === 0 ? (
        <EmptyList message="Você ainda não criou nenhum post." />
      ) : (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {posts.map((post) => (
              <UserPostListCard key={post.id} post={post} handleDelete={handleDelete} />
            ))}
          </div>
          {totalPages > 1 && (
            <div className="mt-8 flex justify-center gap-2">
              <button
                onClick={() => setCurrentPage(currentPage - 1)}
                disabled={currentPage === 1}
                className="px-4 py-2 border rounded-md hover:bg-gray-50 disabled:opacity-50"
              >
                Anterior
              </button>
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                <button
                  key={page}
                  onClick={() => setCurrentPage(page)}
                  className={`px-4 py-2 border rounded-md ${
                    currentPage === page
                      ? "bg-blue-600 text-white border-blue-600"
                      : "hover:bg-gray-50"
                  }`}
                >
                  {page}
                </button>
              ))}
              <button
                onClick={() => setCurrentPage(currentPage + 1)}
                disabled={currentPage === totalPages}
                className="px-4 py-2 border rounded-md hover:bg-gray-50 disabled:opacity-50"
              >
                Próximo
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
}