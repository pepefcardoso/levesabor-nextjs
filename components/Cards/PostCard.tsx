"use client";

import Link from "next/link";
import React from "react";
import routes from "../../routes/routes";
import { Post } from "../../typings/post";
import CustomImage from "../Others/CustomImage";
import CustomChip from "../Others/CustomChip";
import { bgColors, txtColors } from "../../constants/colors";
import { Typography } from "../../constants/typography";

const PostCard = ({ post }: { post: Post }) => {
  return (
    <Link href={routes.posts.details(post.id)} className="block">
      <div
        className="border border-gray-300 rounded-lg shadow-md cursor-pointer 
                   transition-transform duration-300 ease-in-out 
                   hover:scale-105 hover:shadow-lg flex flex-col h-[420px] w-full sm:w-auto bg-white"
      >
        <div className="w-full h-48 sm:h-40 relative">
          <CustomImage
            src={post.image?.url ?? "/placeholder.jpg"}
            alt={post.title}
            width="100%"
            height="100%"
            rounded="lg"
            objectFit="cover"
          />
        </div>

        <div className="p-4 flex-col flex-grow">
          {post.category?.name && (
            <CustomChip bgColor={bgColors.pineapple} fontColor={txtColors.black} text={post.category.name} />
          )}

          <h2 className="text-lg sm:text-xl font-bold my-2 line-clamp-2">{post.title}</h2>

          <p className={`${Typography.summary} ${txtColors.gray500}`}>{post.summary}</p>
        </div>
      </div>
    </Link>
  );
};

export default PostCard;
