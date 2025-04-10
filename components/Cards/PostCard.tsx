"use client";

import Image from "next/image";
import Link from "next/link";
import CustomChip from "../Others/CustomChip";
import { Typography } from "@/constants/typography";
import clsx from "clsx";
import routes from "../../routes/routes";
import { Post } from "@/typings/post";
import { postService } from "@/services/index";
import useAuthStore from "@/store/authStore";
import useFavorite from "../../hooks/useFavorite";
import RatingDisplay from "../Common/RatingDisplay";
import FavoriteButton from "../Common/FavoriteButton";

interface PostCardProps {
  post: Post;
}

const PostCard = ({ post }: PostCardProps) => {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);

  const toggleFavorite = async () => {
    return postService.toggleFavoritePost(post.id);
  };

  const { isFavorite, isToggling, handleFavoriteClick } = useFavorite(
    toggleFavorite,
    post.is_favorited ?? false
  );

  return (
    <Link href={routes.posts.details(post.id)} className="block">
      <div className="border border-gray-600 rounded-lg shadow-md cursor-pointer transition-transform duration-300 ease-in-out hover:scale-105 hover:shadow-lg flex flex-col h-[400px] w-full sm:w-auto bg-white">
        <div className="relative rounded-t-lg overflow-hidden flex-1">
          <Image
            src={post.image?.url ?? "/placeholder.jpg"}
            alt={post.title ? post.title : "Post Title"}
            fill
            className="object-cover"
          />
        </div>
        <div className="p-4 flex flex-col items-start space-y-4 flex-1">
          {post.category?.name && <CustomChip text={post.category.name} />}
          <h2 className={clsx(Typography.Title, "line-clamp-2")}>
            {post.title}
          </h2>
          <p className={clsx(Typography.Caption, "line-clamp-3", "text-gray-700")}>
            {post.summary}
          </p>
          <div className="flex items-center justify-between w-full mt-2">
            <RatingDisplay rating={post.ratings_avg_rating} />
            {!isAuthenticated ? (
              <div
                title="Você precisa estar autenticado para favoritar"
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                }}
              >
                <FavoriteButton
                  isFavorite={isFavorite}
                  isToggling={isToggling}
                  onClick={handleFavoriteClick}
                />
              </div>
            ) : (
              <FavoriteButton
                isFavorite={isFavorite}
                isToggling={isToggling}
                onClick={handleFavoriteClick}
              />
            )}
          </div>
        </div>
      </div>
    </Link>
  );
};

export default PostCard;
