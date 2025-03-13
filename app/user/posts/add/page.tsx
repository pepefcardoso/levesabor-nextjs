"use client";

import { PostForm } from "@/components/Forms/PostForm";
import PageSkeleton from "@/components/Skeletons/PageSkeleton";
import { Typography } from "@/constants/typography";
import { getPostCategories } from "@/services/postCategoryService";
import { createPost } from "@/services/postService";
import { getPostTopics } from "@/services/postTopicService";
import { PostCategory, PostTopic } from "@/typings/post";
import clsx from "clsx";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

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
      } catch {
        toast.error("Falha ao carregar dados. Tente novamente.");
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
      toast.success("Post criado com sucesso!");
      setTimeout(() => router.push("/user/posts"), 2000);
    } catch {
      toast.error("Falha ao criar post. Tente novamente.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isLoadingData) {
    return <PageSkeleton />;
  }

  return (
    <div className="container mx-auto px-4 py-10 max-w-4xl">
      <div className="bg-white rounded-lg shadow-lg p-8">
        <h1 className={clsx(Typography.Title, "mb-8")}>
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
  );
}
