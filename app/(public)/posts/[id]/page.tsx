"use client";

import AuthorInfo from "@/components/Others/AuthorInfo";
import CustomChip from "@/components/Others/CustomChip";
import EmptyList from "@/components/Others/EmptyList";
import PageSkeleton from "@/components/Skeletons/PageSkeleton";
import { txtColors } from "@/constants/colors";
import { Typography } from "@/constants/typography";
import { Post } from "@/typings/post";
import clsx from "clsx";
import Image from "next/image";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { FaExclamationTriangle } from "react-icons/fa";
import { formatDate, sanitizeImageUrl } from "../../../../tools/helper";
import { postService } from "@/services/index";

const PostDetails = () => {
  const { id } = useParams();
  const [post, setPost] = useState<Post | null>(null);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    if (id) {
      const fetchPost = async () => {
        setIsLoaded(false);
        try {
          const data = await postService.getById(id as string);
          setPost(data);
          setIsLoaded(true);
        } catch (err) {
          const message = err instanceof Error ? err.message : "Falha ao carregar receita";
          toast.error(message);
          setPost(null);
          setIsLoaded(true);
        }
      };
      fetchPost();
    }
  }, [id]);

  if (!isLoaded) {
    return <PageSkeleton />;
  }
  if (!post)
    return (
      <div className="min-h-screen mx-auto flex items-center justify-center">
        <EmptyList title="Receita não encontrada" description="Tente outra busca" Icon={FaExclamationTriangle} />
      </div>
    );

  return (
    <div className="container mx-auto px-6 max-w-5 xl py-6">
      {post.category?.name && (
        <div className="mb-4">
          <CustomChip text={post.category?.name} />
        </div>
      )}

      <h1 className={clsx(Typography.Headline, "mb-2 leading-snug")}>{post.title}</h1>
      <p className={clsx(Typography.Subtitle, txtColors.gray700, "mb-6")}>{post.summary}</p>

      <div className="relative w-full h-[400px] rounded-md shadow-md overflow-hidden">
        <Image
          src={sanitizeImageUrl(post.image?.url) || "/placeholder.jpg"}
          alt={post.title || "Imagem do post"}
          fill
          className="object-cover rounded-md"
          priority
        />
      </div>

      <div className={clsx(Typography.Body, "leading-relaxed space-y-4 my-6")}>
        {post.content?.split("\n").map((paragraph, index) => (
          <p key={index}>{paragraph}</p>
        ))}
      </div>
      {post.topics && post.topics.length > 0 && (
        <div className="flex flex-wrap gap-2 mb-6">
          {post.topics.map((topic) => (
            <CustomChip key={topic.id} text={"#" + topic.name.toLowerCase()} />
          ))}
        </div>
      )}

      <div className="mt-10">
        <AuthorInfo
          authorName={post.user?.name || "Autor"}
          authorImage={sanitizeImageUrl(post.user?.image?.url)}
          postDate={post.created_at ? `Postado em ${formatDate(post.created_at)}` : "Data indisponível"}
        ></AuthorInfo>
      </div>
    </div>
  );
};

export default PostDetails;
