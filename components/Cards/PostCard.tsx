"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import CustomChip from "../Others/CustomChip";
import { Typography } from "@/constants/typography";
import clsx from "clsx";
import { iconColors, txtColors } from "@/constants/colors";
import routes from "../../routes/routes";
import { FiStar, FiHeart } from "react-icons/fi";
import { FaHeart } from "react-icons/fa";
import { Post } from "@/typings/post";
import useAuthStore from "@/store/authStore";
import IconButton from "../Buttons/IconButton";
import { postService } from "@/services/index";
import toast from "react-hot-toast";
import { ImSpinner2 } from "react-icons/im";

const PostCard = ({ post }: { post: Post }) => {
  const [isFavorite, setIsFavorite] = useState(post.is_favorited ?? false);
  const [isToggling, setIsToggling] = useState(false);
  const rating = post.ratings_avg_rating ?? 0;
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);

  const handleFavoriteClick = async (
    e?: React.MouseEvent<HTMLButtonElement | HTMLAnchorElement>
  ): Promise<void> => {
    e?.preventDefault();
    e?.stopPropagation();

    if (!isAuthenticated) return;

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

  const icon = isAuthenticated
    ? isFavorite
      ? FaHeart
      : FiHeart
    : FiHeart;

  const iconColor = isAuthenticated
    ? isFavorite
      ? iconColors.red
      : iconColors.gray
    : iconColors.grayLight;

  const favoriteButton = (
    <IconButton
      onClick={handleFavoriteClick}
      Icon={isToggling ? ImSpinner2 : icon}
      color={iconColor}
      size={24}
      className={isToggling ? "animate-spin" : ""}
      disabled={isToggling}
    />
  );

  return (
    <Link href={routes.posts.details(post.id)} className="block">
      <div className="border border-gray-600 rounded-lg shadow-md cursor-pointer transition-transform duration-300 ease-in-out hover:scale-105 hover:shadow-lg flex flex-col h-[400px] w-full sm:w-auto bg-white">
        <div className="relative rounded-t-lg overflow-hidden flex-[2]">
          <Image
            src={post.image?.url ?? "/placeholder.jpg"}
            alt={post.title ? post.title : "Post Title"}
            fill
            className="object-cover"
          />
        </div>
        <div className="p-4 flex flex-col items-start space-y-4 flex-[3]">
          {post.category?.name && <CustomChip text={post.category.name} />}
          <h2 className={clsx(Typography.Title, "line-clamp-2")}>{post.title}</h2>
          <p className={clsx(Typography.Caption, txtColors.gray700, "line-clamp-3")}>
            {post.summary}
          </p>
          <div className="flex items-center justify-between w-full mt-2">
            <div className="flex items-center space-x-1">
              <FiStar className="w-5 h-5" color={rating > 0 ? "#FBBF24" : "#9CA3AF"} />
              <span className="text-sm font-medium">
                {rating > 0 ? rating.toFixed(1) : "-"}
              </span>
            </div>
            {!isAuthenticated ? (
              <div
                title="Você precisa estar autenticado para favoritar"
                className="inline-block"
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                }}
              >
                {favoriteButton}
              </div>
            ) : (
              favoriteButton
            )}
          </div>
        </div>
      </div>
    </Link>
  );
};

export default PostCard;
