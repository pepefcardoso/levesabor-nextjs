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
import AuthorInfo from "../Others/AuthorInfo";
import { formatDate, sanitizeImageUrl } from "../../tools/helper";
import PostFavoriteButton from "../Common/PostFavoriteButton";

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
      <div className="rounded-lg shadow-md cursor-pointer transition-transform duration-300 ease-in-out hover:scale-105 hover:shadow-lg h-[500px] w-full sm:w-auto bg-white flex flex-col">
        <div className="h-1/2 pt-4 px-4">
          <div className="relative h-full w-full rounded-lg shadow overflow-hidden">
            <Image
              src={post.image?.url ?? "/placeholder.jpg"}
              alt={post.title ? post.title : "Post Title"}
              fill
              className="object-cover"
            />
          </div>
        </div>
        <div className="h-1/2 p-4 flex flex-col justify-between">
          <div>
            {post.category?.name && <CustomChip text={post.category.name} />}
            <h2 className={clsx(Typography.Title, "line-clamp-2 mt-2")}>
              {post.title}
            </h2>
            <p className={clsx(Typography.Caption, "line-clamp-3 text-gray-700 my-2")}>
              {post.summary}
            </p>
          </div>
          <div className="flex items-center justify-between mt-4">
            <AuthorInfo authorName={post.user?.name ?? "Usuário"} postDate={formatDate(post.updated_at ?? "")} authorImage={sanitizeImageUrl(post.user?.image?.url)}></AuthorInfo>
            <PostFavoriteButton
              isFavorite={isFavorite}
              isToggling={isToggling}
              onClick={handleFavoriteClick}
            />
          </div>
        </div>
      </div>
    </Link>
  );
};

export default PostCard;
