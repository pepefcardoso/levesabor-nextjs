"use client";

import React, { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import Image from "next/image";
import toast from "react-hot-toast";
import useAuthStore from "../../../store/authStore";
import { PaginationResponse, Post } from "../../../typings/api";
import { deletePost, getMyPosts } from "../../../services/postService";
import CardSkeleton from "../../../components/Skeletons/CardSkeleton";
import EmptyList from "../../../components/EmptyList";

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
      toast.error("Please refresh the page", { position: "bottom-left" });
      setIsLoaded(false);
    }
  }, [user, currentPage]);

  useEffect(() => {
    fetchUserPosts();
  }, [fetchUserPosts]);

  const handleDelete = async (postId: string) => {
    if (!confirm("Are you sure you want to delete this post?")) return;
    try {
      await deletePost(postId);
      if (posts.length === 1 && currentPage > 1) {
        setCurrentPage(currentPage - 1);
      } else {
        fetchUserPosts();
      }
    } catch {
      toast.error("Please refresh the page", { position: "bottom-left" });
    }
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-7xl">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900">My Posts</h1>
        <Link
          href="/user/posts/add"
          className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
        >
          Add New Post
        </Link>
      </div>

      {!isLoaded ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {Array.from({ length: 6 }).map((_, index) => (
            <CardSkeleton key={index} />
          ))}
        </div>
      ) : posts.length === 0 ? (
        <EmptyList message="You haven't created any posts yet." />
      ) : (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {posts.map((post) => (
              <div
                key={post.id}
                className="border rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow"
              >
                {post.image?.url && (
                  <div className="relative w-full h-48">
                    <Image
                      src={post.image.url}
                      alt={post.title}
                      fill
                      className="object-cover"
                    />
                  </div>
                )}
                <div className="p-4">
                  <h2 className="text-xl font-semibold mb-2">{post.title}</h2>
                  <p className="text-gray-600 mb-4 line-clamp-3">
                    {post.summary}
                  </p>
                  <div className="flex flex-wrap gap-2 mb-4">
                    <span className="px-2 py-1 bg-gray-100 rounded-full text-sm">
                      {post.category?.name}
                    </span>
                    {post.topics?.map((topic) => (
                      <span
                        key={topic.id}
                        className="px-2 py-1 bg-gray-100 rounded-full text-sm"
                      >
                        {topic.name}
                      </span>
                    ))}
                  </div>
                  <div className="flex justify-end gap-2">
                    <Link
                      href={`/posts/${post.id}`}
                      className="px-3 py-1 text-blue-600 hover:bg-blue-50 rounded"
                    >
                      View
                    </Link>
                    <Link
                      href={`/user/posts/update/${post.id}`}
                      className="px-3 py-1 text-green-600 hover:bg-green-50 rounded"
                    >
                      Edit
                    </Link>
                    <button
                      onClick={() => handleDelete(post.id)}
                      className="px-3 py-1 text-red-600 hover:bg-red-50 rounded"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
          {totalPages > 1 && (
            <div className="mt-8 flex justify-center gap-2">
              <button
                onClick={() => setCurrentPage(currentPage - 1)}
                disabled={currentPage === 1}
                className="px-4 py-2 border rounded-md hover:bg-gray-50 disabled:opacity-50"
              >
                Previous
              </button>
              {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                (page) => (
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
                )
              )}
              <button
                onClick={() => setCurrentPage(currentPage + 1)}
                disabled={currentPage === totalPages}
                className="px-4 py-2 border rounded-md hover:bg-gray-50 disabled:opacity-50"
              >
                Next
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
}
