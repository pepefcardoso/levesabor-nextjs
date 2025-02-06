"use client";

import React, { useEffect, useState } from "react";
import PostCard from "../../components/PostCard";
import PostCategoryCard from "../../components/PostCategoryCard";
import NewsletterForm from "../../components/NewsletterForm";
import { Post, PostCategory, PostTopic } from "../../typings/api";
import { getPosts } from "../../services/postService";
import CardSkeleton from "../../components/CardSkeleton";
import PostTopicCard from "../../components/PostTopicCard";
import { getPostCategories } from "../../services/postCategoryService";
import { getPostTopics } from "../../services/postTopicService";

interface PaginationResponse<T> {
  data: T[];
  current_page: number;
  last_page: number;
}

export default function PostsHome() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [categories, setCategories] = useState<PostCategory[]>([]);
  const [topics, setTopics] = useState<PostTopic[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchPosts = async () => {
    try {
      const response: PaginationResponse<Post> = await getPosts({
        page: 1,
        perPage: 4,
      });
      setPosts(response.data);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const fetchCategories = async () => {
    try {
      const response: PostCategory[] =
        await getPostCategories();
      setCategories(response);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const fetchTopics = async () => {
    try {
      const response: PostTopic[] =
        await getPostTopics();
      setTopics(response);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPosts();
    fetchCategories();
    fetchTopics();
  });

  return (
    <div className="container mx-auto px-4 py-8 max-w-5xl w-full">
      <div className="px-4">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl sm:text-3xl font-bold text-left">
            Últimos Posts
          </h2>
        </div>

        {error && <div className="text-red-500 mb-4">{error}</div>}

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {loading
            ? [1, 2, 3, 4].map((skeletonId) => (
                <CardSkeleton key={skeletonId} />
              ))
            : posts.map((post) => <PostCard key={post.id} post={post} />)}
        </div>
      </div>

      <div className="px-4">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl sm:text-3xl font-bold text-left">
            Categorias
          </h2>
        </div>

        {error && <div className="text-red-500 mb-4">{error}</div>}

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {loading
            ? [1, 2, 3, 4].map((skeletonId) => (
                <CardSkeleton key={skeletonId} />
              ))
            : categories.map((category) => <PostCategoryCard key={category.id} category={category} />)}
        </div>
      </div>

      <div className="px-4">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl sm:text-3xl font-bold text-left">
            Tópicos
          </h2>
        </div>

        {error && <div className="text-red-500 mb-4">{error}</div>}

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {loading
            ? [1, 2, 3, 4].map((skeletonId) => (
                <CardSkeleton key={skeletonId} />
              ))
            : topics.map((topic) => <PostTopicCard key={topic.id} topic={topic} />)}
        </div>
      </div>

      <NewsletterForm />
    </div>
  );
}
