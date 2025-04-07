"use client";

import { PostForm } from "@/components/Forms/PostForm";
import PageSkeleton from "@/components/Skeletons/PageSkeleton";
import EmptyList from "@/components/Others/EmptyList";
import { Typography } from "@/constants/typography";
import { PostCategory, PostTopic } from "@/typings/post";
import clsx from "clsx";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { FaExclamationTriangle } from "react-icons/fa";
import { postCategoryService, postService, postTopicService } from "@/services/index";

export default function CreatePostPage() {
  const router = useRouter();
  const [isLoadingData, setIsLoadingData] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [categories, setCategories] = useState<PostCategory[]>([]);
  const [topics, setTopics] = useState<PostTopic[]>([]);
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoadingData(true);
      setHasError(false);
      try {
        const [categoriesRes, topicsRes] = await Promise.all([
          postCategoryService.getAll({ page: 1, per_page: 50 }),
          postTopicService.getAll({ page: 1, per_page: 50 }),
        ]);
        setCategories(categoriesRes.data);
        setTopics(topicsRes.data);
      } catch {
        toast.error("Falha ao carregar dados. Tente novamente.");
        setHasError(true);
      } finally {
        setIsLoadingData(false);
      }
    };
    fetchData();
  }, []);

  const handleCreatePost = async (data: FormData) => {
    setIsSubmitting(true);
    try {
      await postService.create(data);
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

  if (hasError) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <EmptyList
          title="Falha ao carregar dados"
          description="Ocorreu um erro ao carregar os dados. Tente novamente."
          Icon={FaExclamationTriangle}
        />
      </div>
    );
  }

  return (
    <div className="container mx-auto px-6 py-10 max-w-4xl">
      <div className="bg-white rounded-lg shadow-lg p-8">
        <h1 className={clsx(Typography.Title, "mb-12")}>Criar Novo Post</h1>
        <PostForm categories={categories} topics={topics} isSubmitting={isSubmitting} onSubmit={handleCreatePost} />
      </div>
    </div>
  );
}
