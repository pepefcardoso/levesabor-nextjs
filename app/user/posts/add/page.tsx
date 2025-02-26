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
        console.error("Erro ao carregar dados:", err);
        toast.error("Falha ao carregar dados. Tente novamente.", {
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
      toast.success("Post criado com sucesso!", { position: "bottom-left" });
      setTimeout(() => router.push("/user/posts"), 2000);
    } catch (err) {
      console.error("Erro ao criar post:", err);
      toast.error("Falha ao criar post. Tente novamente.", {
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
    <div className="min-h-screen bg-gray-100 py-8">
      <div className="container mx-auto px-4 max-w-4xl">
        <div className="bg-white rounded-lg shadow-lg p-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-8">
            Criar Novo Post
          </h1>
          <PostForm
            categories={categories}
            topics={topics}
            isSubmitting={isSubmitting}
            onSubmit={handleCreatePost}
          />
        </div>
      </div>
    </div>
  );
}