"use client";

import { Post } from "@/typings/post";
import Image from "next/image";
import Link from "next/link";
import routes from "routes/routes";
import CustomChip from "../Others/CustomChip";
import { Typography } from "@/constants/typography";
import clsx from "clsx";
import { txtColors } from "@/constants/colors";

const PostCard = ({ post }: { post: Post }) => {
  return (
    <Link href={routes.posts.details(post.id)} className="block">
      <div
        className="border border-gray-300 rounded-lg shadow-md cursor-pointer 
                   transition-transform duration-300 ease-in-out 
                   hover:scale-105 hover:shadow-lg flex flex-col h-[400px] w-full sm:w-auto bg-white"
      >
        <div className="w-full h-56 sm:h-48 relative rounded-t-lg overflow-hidden">
          <Image
            src={post.image?.url ?? "/placeholder.jpg"}
            alt={post.title}
            fill
            className="object-cover"
          />
        </div>

        <div className="p-4 flex-col flex-grow">
          {post.category?.name && (
            <CustomChip text={post.category.name} />
          )}

          <h2 className={clsx(Typography.Headline, "my-2 line-clamp-2")}>
            {post.title}
          </h2>

          <p className={clsx(Typography.Subtitle, txtColors.gray500, "line-clamp-3")}>
            {post.summary}
          </p>
        </div>
      </div>
    </Link>
  );
};

export default PostCard;
