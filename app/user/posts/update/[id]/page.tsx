"use client";
import React, { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import toast from "react-hot-toast";
import { getPostCategories } from "../../../../../services/postCategoryService";
import { getPostTopics } from "../../../../../services/postTopicService";
import { updatePost } from "../../../../../services/postService";
import { getPost } from "../../../../../services/postService";
import { FormSkeleton } from "../../../../../components/Skeletons/FormSkeleton";
import { PostForm } from "../../../../../components/Forms/PostForm";
import { PostCategory, PostTopic } from "../../../../../typings/post";

export default function UpdatePostPage() {
  const router = useRouter();
  const params = useParams();
  const postId = Array.isArray(params.id) ? params.id[0] : params.id;

  const [isLoadingData, setIsLoadingData] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [categories, setCategories] = useState<PostCategory[]>([]);
  const [topics, setTopics] = useState<PostTopic[]>([]);
  const [initialData, setInitialData] = useState({
    title: "",
    summary: "",
    content: "",
    category_id: "",
    topics: [] as string[],
  });

  useEffect(() => {
    const fetchData = async () => {
      if (!postId) {
        toast.error("Invalid post ID");
        return;
      }
      setIsLoadingData(true);
      try {
        const [categoriesRes, topicsRes, postRes] = await Promise.all([
          getPostCategories({ pagination: { page: 1, per_page: 50 } }),
          getPostTopics({ pagination: { page: 1, per_page: 50 } }),
          getPost(postId),
        ]);

        setCategories(categoriesRes.data);
        setTopics(topicsRes.data);

        setInitialData({
          title: postRes.title,
          summary: postRes.summary,
          content: postRes.content,
          category_id: postRes.category_id,
          topics: postRes.topics
            ? postRes.topics.map((t: PostTopic) => t.id)
            : [],
        });
      } catch {
        toast.error("Falha ao carregar dados do post");
      } finally {
        setIsLoadingData(false);
      }
    };
    fetchData();
  }, [postId]);

  const handleUpdatePost = async (data: FormData) => {
    if (!postId) return;
    setIsSubmitting(true);
    try {
      await updatePost(postId, data);
      toast.success("Post updated successfully!");
      setTimeout(() => router.push("/user/posts"), 2000);
    } catch {
      toast.error("Falha ao atualizar post");
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
            Editar Post #{postId}
          </h1>
          <PostForm
            initialData={initialData}
            categories={categories}
            topics={topics}
            isSubmitting={isSubmitting}
            onSubmit={handleUpdatePost}
          />
        </div>
      </div>
    </div>
  );
}
