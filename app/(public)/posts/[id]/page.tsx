"use client";

import React, { useState, useEffect } from "react";
import AuthorInfo from "@/components/Others/AuthorInfo";
import CustomChip from "@/components/Others/CustomChip";
import EmptyList from "@/components/Others/EmptyList";
import PageSkeleton from "@/components/Skeletons/PageSkeleton";
import { txtColors } from "@/constants/colors";
import { Typography } from "@/constants/typography";
import { Post } from "@/typings/post";
import { clsx } from "clsx";
import Image from "next/image";
import { useParams } from "next/navigation";
import toast from "react-hot-toast";
import { FaExclamationTriangle } from "react-icons/fa";
import { formatDate, sanitizeImageUrl } from "../../../../tools/helper";
import { postService } from "@/services/index";
import RatingDisplay from "@/components/Common/RatingDisplay";
import RatingForm from "@/components/Common/RatingForm";
import FavoriteButton from "@/components/Common/FavoriteButton";
import CommentsList from "@/components/Common/Comments/CommentsList";
import useAuthStore from "@/store/authStore";

const PostDetails = () => {
  const { id } = useParams();
  const [post, setPost] = useState<Post | null>(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  const [isFavorite, setIsFavorite] = useState(post?.is_favorited ?? false);
  const [isToggling, setIsToggling] = useState(false);

  useEffect(() => {
    if (id) {
      const fetchPost = async () => {
        setIsLoaded(false);
        try {
          const data = await postService.getById(id as string);
          setPost(data);
          setIsFavorite(data.is_favorited ?? false);
          setIsLoaded(true);
        } catch (err) {
          const message = err instanceof Error ? err.message : "Falha ao carregar post";
          toast.error(message);
          setPost(null);
          setIsLoaded(true);
        }
      };
      fetchPost();
    }
  }, [id]);

  const handleFavoriteClick = async (
    e?: React.MouseEvent<HTMLButtonElement | HTMLAnchorElement>
  ): Promise<void> => {
    e?.preventDefault();
    e?.stopPropagation();

    if (!isAuthenticated || !post) return;

    setIsToggling(true);
    const newFavoriteStatus = !isFavorite;
    setIsFavorite(newFavoriteStatus);

    const success = await postService.toggleFavoritePost(post.id);
    if (success) {
      toast.success(
        newFavoriteStatus
          ? "Post adicionado aos favoritos"
          : "Post removido dos favoritos"
      );
    } else {
      toast.error("Erro ao atualizar favorito");
      setIsFavorite(!newFavoriteStatus);
    }
    setIsToggling(false);
  };

  if (!isLoaded) return <PageSkeleton />;
  if (!post)
    return (
      <div className="min-h-screen mx-auto flex items-center justify-center">
        <EmptyList title="Post não encontrado" description="Tente outra busca" Icon={FaExclamationTriangle} />
      </div>
    );

  return (
    <div className="w-full mx-auto px-6 max-w-5xl py-6">
      {post.category?.name && (
        <div className="mb-4">
          <CustomChip text={post.category?.name} />
        </div>
      )}

      <div className="flex items-center justify-between mb-2">
        <h1 className={clsx(Typography.Headline, "leading-snug")}>{post.title}</h1>
        <FavoriteButton
          isFavorite={isFavorite}
          isToggling={isToggling}
          onClick={handleFavoriteClick}
        />
      </div>

      <p className={clsx(Typography.Subtitle, txtColors.gray700, "mb-6")}>{post.summary}</p>

      <div className="relative w-full h-[400px] rounded-md shadow-md overflow-hidden mb-6">
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
        />
      </div>

      <div className="my-6">
        <h2 className={clsx(Typography.Title, "mb-4")}>Avaliação</h2>
        <div className="flex items-center space-x-4">
          <RatingDisplay rating={post.ratings_avg_rating ?? 0} />
          {isAuthenticated ? (
            <RatingForm
              initialRating={post.ratings_avg_rating ?? 0}
              rateableId={post.id}
              rateableType="App\\Models\\Post"
              onRatingUpdated={() => {
                toast.success("Avaliação atualizada");
              }}
            />
          ) : (
            <span className="text-gray-500">Faça login para avaliar</span>
          )}
        </div>
      </div>

      <CommentsList
        commentableId={post.id}
        commentableType="App\\Models\\Post"
      />
    </div>
  );
};

export default PostDetails;
