"use client";

import Link from "next/link";
import React from "react";
import routes from "../../routes/routes";
import { Post } from "../../typings/post";
import CustomImage from "../Others/CustomImage";
import CustomChip from "../Others/CustomChip";

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

        <div className="p-4 flex flex-col flex-grow">
          {post.category?.name && (
            <CustomChip color="green" fontColor="white" text={post.category.name} />
          )}

          <h2 className="text-lg sm:text-xl font-bold mb-1 line-clamp-2">
            {post.title}
          </h2>

          <p className="text-gray-600 text-sm line-clamp-3 h-[4.5rem] overflow-hidden">
            {post.summary}
          </p>
        </div>
      </div>
    </Link>
  );
};

export default PostCard;
