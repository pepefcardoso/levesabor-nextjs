"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { PostCategory, PostTopic } from "../../../../typings/api";
import { getPostCategories } from "../../../../services/postCategoryService";
import { getPostTopics } from "../../../../services/postTopicService";
import { createPost } from "../../../../services/postService";
import { FormSkeleton } from "../../../../components/FormSkeleton";
import { PostForm } from "../../../../components/PostForm";

export default function CreatePostPage() {
  const router = useRouter();
  const [isLoadingData, setIsLoadingData] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [categories, setCategories] = useState<PostCategory[]>([]);
  const [topics, setTopics] = useState<PostTopic[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoadingData(true);
      try {
        const [categoriesRes, topicsRes] = await Promise.all([
          getPostCategories({ pagination: { page: 1, per_page: 50 } }),
          getPostTopics({ pagination: { page: 1, per_page: 50 } }),
        ]);
        setCategories(categoriesRes.data);
        setTopics(topicsRes.data);
      } catch (err) {
        console.error("Error loading data:", err);
        toast.error("Failed to load data. Please try again.", {
          position: "bottom-left",
        });
      } finally {
        setIsLoadingData(false);
      }
    };
    fetchData();
  }, []);

  const handleCreatePost = async (data: FormData) => {
    setIsSubmitting(true);
    try {
      await createPost(data);
      toast.success("Post created successfully!", { position: "bottom-left" });
      setTimeout(() => router.push("/user/posts"), 2000);
    } catch (err) {
      console.error("Error creating post:", err);
      toast.error("Failed to create post. Please try again.", {
        position: "bottom-left",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isLoadingData) {
    return <FormSkeleton />;
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <h1 className="text-4xl font-bold text-gray-900 mb-8">Create New Post</h1>
      <PostForm
        categories={categories}
        topics={topics}
        isSubmitting={isSubmitting}
        onSubmit={handleCreatePost}
      />
    </div>
  );
}
