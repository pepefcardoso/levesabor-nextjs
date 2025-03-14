"use client";

import { PostForm } from "@/components/Forms/PostForm";
import PageSkeleton from "@/components/Skeletons/PageSkeleton";
import { Typography } from "@/constants/typography";
import { getPostCategories } from "@/services/postCategoryService";
import { getPost, updatePost } from "@/services/postService";
import { getPostTopics } from "@/services/postTopicService";
import { PostCategory, PostTopic } from "@/typings/post";
import clsx from "clsx";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

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
    image_url: "",
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
          topics: postRes.topics ? postRes.topics.map((t: PostTopic) => String(t.id)) : [],
          image_url: postRes.image?.url ?? "",
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
    return <PageSkeleton />;
  }

  return (
    <div className="container mx-auto px-6 py-10 max-w-4xl">
      <div className="bg-white rounded-lg shadow-lg p-8">
        <h1 className={clsx(Typography.Title, "mb-12")}>Editar Post #{postId}</h1>
        <PostForm
          initialData={initialData}
          categories={categories}
          topics={topics}
          isSubmitting={isSubmitting}
          onSubmit={handleUpdatePost}
        />
      </div>
    </div>
  );
}
